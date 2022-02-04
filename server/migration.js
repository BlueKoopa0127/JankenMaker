import { sequelize, T_JankenList } from "./models.js";
import * as data from "./sample-data.js";

await sequelize.sync({ force: true });

for (const { title, rock, scissors, paper, play, win } of data.jankenlist) {
    await T_JankenList.create({ title, rock, scissors, paper, play, win });
}