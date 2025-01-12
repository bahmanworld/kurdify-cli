#!/usr/bin/env node

import { program } from "commander";
import loading from "loading-cli";
import { parse } from "node-html-parser";
import pc from "picocolors";
import { default as enquirer } from "inquirer";
import clear from 'clear'

const loader = loading({
  frames: [
    "🕐 ",
    "🕑 ",
    "🕒 ",
    "🕓 ",
    "🕔 ",
    "🕕 ",
    "🕖 ",
    "🕗 ",
    "🕘 ",
    "🕙 ",
    "🕚 ",
  ],
  color: "yellow",
});

program
  .name("kurdify")
  .version("1.0.0-dev")
  .description("Mine checker for every developers");

program
  .command("getTitle")
  .argument("<url>", "Website for parsing its title")
  .action(async (site, options: any) => {
    clear()

    await enquirer.prompt<{ password: any }>({
      name: "password",
      message: "Enter password:",
      type: "select",
      choices: ["123", "456", "789"],
    });

    const p = await enquirer.prompt<{ password: any }>({
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
      const data = await fetch(site);

      //   setTimeout(() => {
      loader.succeed("Website content parsed successfully");
      loader.stop();

      const text = await data.text();
      const html = parse(text);
      console.log(
        "\n",
        pc.bgYellow(pc.black(" Title ")),
        pc.italic(html.querySelector("title")?.innerText)
      );
    } catch (e) {
      loader.fail("Parsing failed");
      loader.info("Please double check your given website address");
      loader.stop();
    }
  });

program.option("-c, --copy", "check for its belongs to");

process.on("unhandledRejection", () => loader.fail("Operation Cancelled"));

program.parse();
