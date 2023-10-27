/**
 * @description 根据二进制数据下载文件
 * @param { Blob } ref
 * @param { String } fileName
 * @param { String } fileType
 */
export function downloadByBlob(
  ref: Blob,
  fileName: string,
  fileType: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
) {
  const blob = new Blob([ref], {
    type: fileType,
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

/**
 * @description 获取本地文件 src
 * @param { File } file
 * @param callback
 */
export function getFileLocalUrl(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      // 监听 FileReader 的加载完成事件
      reader.addEventListener("load", () => {
        // 将读取的文件内容作为数据 URL
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * @description 打开文件选择
 * @param accept
 * @param multiple
 */
export function openFileSelect({
  accept = "*",
  multiple = false,
}): Promise<FileList | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    input.click();
    input.addEventListener("change", () => {
      resolve(input.files);
    });
  });
}
