#!/usr/bin/env node

import axios, { AxiosResponse } from 'axios';
import { Command } from 'commander';
import { EnumEventTypes } from './models/enums/event-types.enum';

let program = new Command();

program.argument('<string>', 'Username').action((username) => {
  axios
    .get(`https://api.github.com/users/${username}/events`)
    .then((res: AxiosResponse) => {
      let data = res.data;

      data.forEach((item: any) => {
        if (item.type === EnumEventTypes.CREATE) {
          console.log(`🚀 Created ${item.repo.name}`);
        } else if (item.type === EnumEventTypes.PUSH) {
          console.log(
            `➕ Pushed ${item.payload.commits.length} commits to ${item.repo.name}`
          );
        } else if (item.type === EnumEventTypes.ISSUE) {
          console.log(`🪲  Opened a new issue in ${item.repo.name}`);
        } else if (item.type === EnumEventTypes.ISSUE_COMMENT) {
          console.log(
            `💬 Comment to ${item.payload.issue.number}. issue at ${item.repo.name}`
          );
        } else if (item.type === EnumEventTypes.PULL_REQUEST) {
          console.log(`📨  Pull request to ${item.repo.name}`);
        }
      });
    });
});

program.parse();
