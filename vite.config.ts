import autoprefixer from "autoprefixer";
import imgCompression from "./vite/vite-plugin-imgcompression";

type AssetInfo = {
    name: string;
    source: Buffer;
    type: string;
};

export default {
    root: "src",
    plugins: [
        imgCompression({
            src: "src/assets/images",
            dest: "dist/assets/images",
        }),
    ],
    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                main: "src/index.html",
            },
            output: {
                assetFileNames: (assetInfo: AssetInfo) => {
                    const info = assetInfo.name.split(".");
                    const extType = info[info.length - 1];
                    if (extType === "css") {
                        return "assets/styles/[name].css";
                    }
                    if (extType === "png") {
                        return "assets/images/[name].[ext]";
                    }

                    return `[name].[ext]`;
                },
                entryFileNames: "bundle.js",
            },
        },
    },
};