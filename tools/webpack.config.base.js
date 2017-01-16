var path = require("path");
var webpack = require("webpack");
var exec = require("child_process").exec;
var execSync = require("child_process").execSync;
var webpack = require("webpack");
var fs = require("fs");

/** For reference in the console. */
var revisionPlugin = new webpack.DefinePlugin({
    "process.env.REVISION": JSON.stringify(execSync(
        'git log --pretty=format:"%h%n%ad%n%f" -1').toString())
});

var shortRevisionPlugin = new webpack.DefinePlugin({
    "process.env.SHORT_REVISION": JSON.stringify(execSync(
        'git log --pretty=format:"%h" -1').toString())
});

/** FarmBot Inc related. */
var npmAddons = new webpack.DefinePlugin({
    "process.env.NPM_ADDON": JSON.stringify(
        process.env.NPM_ADDON || false).toString()
});

exec("rm -rf public/app/index.html");
exec("rm -rf public/app-resources/chunks/*");
exec("rm -rf public/app-resources/*.*");

/** WEBPACK BASE CONFIG */
module.exports = function() {
    return {
        /** Allows imports without file extensions. */
        resolve: {
            extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".json", ".hbs"]
        },

        /** Determines entry file names and locations. */
        // entry: {
        //     "..app-resources/bundle": path.resolve(__dirname, "../src/entry.tsx"),
        //     // "app-resources/vendor": "react",
        //     "../front_page": "./src/front_page/index.tsx",
        //     "../password-reset": "./src/static/password_reset.ts",
        //     "../verify": "./src/static/verify.ts",
        //     "../password_reset": "./src/password_reset/index.tsx",
        // },

        /** Where the app will be either emitted or built based on env. */
        // output: {
        //     path: path.resolve(__dirname, "../public/app-resources/chunks"),
        //     filename: "[name].[chunkhash].js",
        //     libraryTarget: "umd",
        //     publicPath: "/public"
        // },

        /** Shared loaders for prod and dev. */
        module: {
            rules: [
                { test: /\.tsx?$/, use: "ts-loader" },
                {
                    test: [/\.woff$/, /\.woff2$/, /\.ttf$/],
                    use: "url-loader"
                },
                {
                    test: [/\.eot$/, /\.svg(\?v=\d+\.\d+\.\d+)?$/],
                    use: "file-loader"
                }
            ]
        },

        /** Shared plugins for prod and dev. */
        plugins: [
            revisionPlugin,
            shortRevisionPlugin,
            npmAddons
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: "vendor"
            // })
        ],

        /** Webpack Dev Server. */
        devServer: {
            historyApiFallback: {
                index: "/index.html",
                rewrites: [
                    { from: /\/app\//, to: "/app/index.html" },
                    { from: /password_reset/, to: "password_reset.html" }
                ]
            }
        }
    }
}