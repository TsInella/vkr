import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
    mode: "development", // Или "production" для финальной версии
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]", // Обработка изображений
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
}
