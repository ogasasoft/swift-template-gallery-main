import JSZip from "jszip";
import { saveAs } from "file-saver";

// テンプレートのファイル構成定義
export interface TemplateFile {
  path: string;
  content: string;
}

// テンプレートの定義
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  files: TemplateFile[];
}

/**
 * テンプレートを ZIP としてダウンロード
 */
export async function downloadTemplate(template: Template): Promise<void> {
  const zip = new JSZip();

  // 各ファイルを ZIP に追加
  for (const file of template.files) {
    zip.file(file.path, file.content);
  }

  // ZIP ファイルを生成
  const content = await zip.generateAsync({ type: "blob" });

  // ファイルとして保存
  saveAs(content, `${template.name.replace(/\s+/g, "-").toLowerCase()}.zip`);
}
