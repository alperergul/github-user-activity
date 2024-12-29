#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const commander_1 = require("commander");
const event_types_enum_1 = require("./models/enums/event-types.enum");
let program = new commander_1.Command();
program.argument('<string>', 'Username').action((username) => {
    axios_1.default
        .get(`https://api.github.com/users/${username}/events`)
        .then((res) => {
        let data = res.data;
        data.forEach((item) => {
            if (item.type === event_types_enum_1.EnumEventTypes.CREATE) {
                console.log(`🚀 Created ${item.repo.name}`);
            }
            else if (item.type === event_types_enum_1.EnumEventTypes.PUSH) {
                console.log(`➕ Pushed ${item.payload.commits.length} commits to ${item.repo.name}`);
            }
            else if (item.type === event_types_enum_1.EnumEventTypes.ISSUE) {
                console.log(`🪲  Opened a new issue in ${item.repo.name}`);
            }
            else if (item.type === event_types_enum_1.EnumEventTypes.ISSUE_COMMENT) {
                console.log(`💬 Comment to ${item.payload.issue.number}. issue at ${item.repo.name}`);
            }
            else if (item.type === event_types_enum_1.EnumEventTypes.PULL_REQUEST) {
                console.log(`📨  Pull request to ${item.repo.name}`);
            }
        });
    });
});
program.parse();
//# sourceMappingURL=index.js.map