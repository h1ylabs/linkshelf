import { Plugin } from "vite";

export default function outputConfig(): Plugin {
  return {
    // 최종 빌드 결과물의 출력 스키마를 설정합니다.
    name: "linkshelf-build-plugin-output",
    config() {
      return {
        build: {
          outDir: "build",
        },
      };
    },
    outputOptions(options) {
      return {
        ...options,
        dir: "build",
        manualChunks: {
          "@react": ["react", "react-dom"],
        },
        entryFileNames: "chunks/[name]-[hash].js",
        chunkFileNames: "chunks/[name]-[hash].js",
      };
    },
  };
}