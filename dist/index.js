#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const loading_cli_1 = __importDefault(require("loading-cli"));
const node_html_parser_1 = require("node-html-parser");
const picocolors_1 = __importDefault(require("picocolors"));
const inquirer_1 = __importDefault(require("inquirer"));
const loader = (0, loading_cli_1.default)({ frames: ["🕐 ", "🕑 ", "🕒 ", "🕓 ", "🕔 ", "🕕 ", "🕖 ", "🕗 ", "🕘 ", "🕙 ", "🕚 "], color: "yellow" });
commander_1.program
    .name("kurdify")
    .version("1.0.0-dev")
    .description("Mine checker for every developers");
commander_1.program
    .command("getTitle")
    .argument("<url>", "Website for parsing its title")
    .action((site, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield inquirer_1.default.prompt({
        name: "password",
        message: "Enter password:",
        type: "select",
        choices: ["123", "456", "789"]
    });
    const p = yield inquirer_1.default.prompt({
        name: "password",
        message: "Enter password:",
        type: "password",
    });
    if (p.password !== "123") {
        loader.fail("password is invalid.");
        return;
    }
    loader.start("Parsing html, please wait ...");
    try {
        const data = yield fetch(site);
        //   setTimeout(() => {
        loader.succeed("Website content parsed successfully");
        loader.stop();
        const text = yield data.text();
        const html = (0, node_html_parser_1.parse)(text);
        console.log("\n", picocolors_1.default.bgYellow(picocolors_1.default.black(" Title ")), picocolors_1.default.italic((_a = html.querySelector("title")) === null || _a === void 0 ? void 0 : _a.innerText));
    }
    catch (e) {
        loader.fail("Parsing failed");
        loader.info("Please double check your given website address");
        loader.stop();
    }
}));
commander_1.program.option("-c, --copy", "check for its belongs to");
process.on("unhandledRejection", () => loader.fail("Operation Cancelled"));
commander_1.program.parse();
