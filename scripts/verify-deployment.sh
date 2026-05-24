#!/bin/bash

# Deployment Verification Script
# This script verifies that a deployment is healthy before confirming completion

set -e

echo "🔍 Swift Template Gallery - Deployment Verification"
echo "======================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values (can be overridden)
CLUSTER="${ECS_CLUSTER:-my-cluster}"
SERVICE="${ECS_SERVICE:-swift-template-gallery}"
REGION="${AWS_REGION:-us-east-1}"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --cluster)
      CLUSTER="$2"
      shift 2
      ;;
    --service)
      SERVICE="$2"
      shift 2
      ;;
    --region)
      REGION="$2"
      shift 2
      ;;
    --help)
      echo "Usage: $0 [OPTIONS]"
      echo "Options:"
      echo "  --cluster NAME        ECS cluster name (default: my-cluster)"
      echo "  --service NAME        ECS service name (default: swift-template-gallery)"
      echo "  --region REGION       AWS region (default: us-east-1)"
      echo "  --help                Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

echo "Configuration:"
echo "  Cluster: $CLUSTER"
echo "  Service: $SERVICE"
echo "  Region: $REGION"
echo ""

# Function to check command success
check_success() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $1${NC}"
    return 0
  else
    echo -e "${RED}✗ $1${NC}"
    return 1
  fi
}

# Check 1: AWS CLI is configured
echo "1️⃣  Checking AWS CLI configuration..."
if aws sts get-caller-identity --region "$REGION" >/dev/null 2>&1; then
  check_success "AWS CLI is configured"
else
  echo -e "${RED}✗ AWS CLI not configured${NC}"
  exit 1
fi

# Check 2: ECS cluster exists
echo "2️⃣  Checking ECS cluster..."
if aws ecs describe-clusters --clusters "$CLUSTER" --region "$REGION" >/dev/null 2>&1; then
  check_success "ECS cluster '$CLUSTER' exists"
else
  echo -e "${RED}✗ ECS cluster '$CLUSTER' not found${NC}"
  exit 1
fi

# Check 3: ECS service exists
echo "3️⃣  Checking ECS service..."
if aws ecs describe-services --cluster "$CLUSTER" --services "$SERVICE" --region "$REGION" >/dev/null 2>&1; then
  check_success "ECS service '$SERVICE' exists"
else
  echo -e "${RED}✗ ECS service '$SERVICE' not found${NC}"
  exit 1
fi

# Check 4: Service deployment status
echo "4️⃣  Checking deployment status..."
DEPLOYMENT_STATUS=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].deployments[0].status' \
  --output text 2>/dev/null || echo "UNKNOWN")

case "$DEPLOYMENT_STATUS" in
  PRIMARY|PRIMARY_OLD)
    check_success "Deployment status: $DEPLOYMENT_STATUS"
    ;;
  *)
    echo -e "${YELLOW}⚠ Deployment status: $DEPLOYMENT_STATUS (not yet stable)${NC}"
    ;;
esac

# Check 5: Service running tasks
echo "5️⃣  Checking running tasks..."
RUNNING_COUNT=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].runningCount' \
  --output text 2>/dev/null || echo "0")

DESIRED_COUNT=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].desiredCount' \
  --output text 2>/dev/null || echo "0")

echo "  Running: $RUNNING_COUNT / Desired: $DESIRED_COUNT"
if [ "$RUNNING_COUNT" -eq "$DESIRED_COUNT" ] && [ "$RUNNING_COUNT" -gt 0 ]; then
  check_success "All tasks are running"
else
  echo -e "${YELLOW}⚠ Not all tasks are running${NC}"
fi

# Check 6: Task health
echo "6️⃣  Checking task health..."
HEALTH_STATUS=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].healthStatus' \
  --output text 2>/dev/null || echo "UNKNOWN")

echo "  Health status: $HEALTH_STATUS"
case "$HEALTH_STATUS" in
  HEALTHY)
    check_success "Service is healthy"
    ;;
  DRAINING|SERVING)
    check_success "Service health status: $HEALTH_STATUS"
    ;;
  *)
    echo -e "${YELLOW}⚠ Health status: $HEALTH_STATUS${NC}"
    ;;
esac

# Check 7: Recent deployment
echo "7️⃣  Checking recent deployments..."
DEPLOYMENT_ARN=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].deployments[0].id' \
  --output text 2>/dev/null || echo "UNKNOWN")

if [ "$DEPLOYMENT_ARN" != "UNKNOWN" ]; then
  check_success "Last deployment: $DEPLOYMENT_ARN"
else
  echo -e "${YELLOW}⚠ Could not determine deployment ARN${NC}"
fi

# Check 8: Task definition
echo "8️⃣  Checking task definition..."
TASK_DEF=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].taskDefinition' \
  --output text 2>/dev/null || echo "UNKNOWN")

if [ "$TASK_DEF" != "UNKNOWN" ]; then
  check_success "Task definition: $TASK_DEF"
else
  echo -e "${YELLOW}⚠ Could not determine task definition${NC}"
fi

# Summary
echo ""
echo "======================================================"
echo "✅ Verification Complete"
echo ""
echo "Summary:"
echo "  Cluster:        $CLUSTER"
echo "  Service:        $SERVICE"
echo "  Region:         $REGION"
echo "  Deployment:     $DEPLOYMENT_STATUS"
echo "  Running Tasks:  $RUNNING_COUNT"
echo "  Health Status:  $HEALTH_STATUS"
echo ""

if [ "$DEPLOYMENT_STATUS" = "PRIMARY" ] && [ "$RUNNING_COUNT" -eq "$DESIRED_COUNT" ]; then
  echo -e "${GREEN}🎉 Deployment appears healthy!${NC}"
  exit 0
else
  echo -e "${YELLOW}⚠ Deployment is not yet fully stable. Consider waiting or reviewing logs.${NC}"
  exit 1
fi
