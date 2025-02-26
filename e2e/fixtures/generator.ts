// Set test secret before importing hash function
process.env.SECRET = 'test-secret';

import fs from 'fs';
import path from 'path';
import { hash } from '../../../proofofcombat-server/hash';

function cleanName(name: string): string {
  return name.trim().substr(0, 20);
}

function nameToId(name: string): string {
  return hash(cleanName(name).toLowerCase());
}

// Simple fixture generator for a level 9 character
export function generatePreRebirthFixture() {
  const username = 'prerebirthtest';
  const accountId = nameToId(username);
  const fixture = {
    accounts: {
      [accountId]: {
        id: accountId,
        name: username,
        password: hash('testpassword'),
        authVersion: 1,
        banned: false
      }
    },
    heroes: {
      [accountId]: {
        id: accountId,
        name: username,
        level: 9,
        levelCap: 10,
        experience: 900,
        needed: 1000,
        gold: 1000,
        rebirths: 0,
        class: 'Adventurer',
        activeStance: 'Normal',
        availableStances: ['Normal'],
        stats: {
          strength: 14,
          dexterity: 14,
          constitution: 14,
          intelligence: 14,
          wisdom: 14,
          willpower: 14,
          luck: 14
        },
        skills: {
          attackingAccuracy: 0,
          castingAccuracy: 0,
          attackingDamage: 0,
          castingDamage: 0,
          vitality: 0,
          resilience: 0,
          regeneration: 0
        },
        combat: {
          health: 100,
          maxHealth: 100,
          strength: 14,
          dexterity: 14,
          constitution: 14,
          intelligence: 14,
          wisdom: 14,
          willpower: 14,
          luck: 14
        },
        location: {
          x: 0,
          y: 0,
          map: 'default'
        },
        inventory: [
          {
            id: "totem-of-rebirth",
            baseItem: "totem-of-rebirth",
            owner: accountId,
            name: "Totem of Rebirth",
            type: "quest",
            level: 1,
            enchantment: null
          }
        ],
        equipment: {
          accessories: [],
          footArmor: null,
          headArmor: null,
          legArmor: null,
          handArmor: null,
          bodyArmor: null,
          rightHand: null,
          leftHand: null,
          artifact: null
        },
        questLog: {
          id: "questlog",
          washedUp: {
            id: "washedup",
            started: false,
            finished: false,
            progress: 0,
          },
          rebirth: {
            id: "rebirth",
            started: false,
            finished: false,
            progress: 0,
          },
          droop: {
            id: "droop",
            started: false,
            finished: false,
            progress: 0,
          },
          clockwork: {
            id: "clockwork",
            started: false,
            finished: false,
            progress: 0,
          },
          settlements: {
            id: "settlements",
            started: false,
            finished: false,
            progress: 0,
          },
          tavernChampion: {
            id: "tavernchampion",
            started: false,
            finished: false,
            progress: 0,
          },
          meetTheQueen: {
            id: "meetthequeen",
            started: false,
            finished: false,
            progress: 0,
          },
        }
      }
    }
  };

  const fixturePath = path.join(__dirname, 'pre-rebirth.json');
  fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2));
  console.log('Pre-rebirth fixture generated successfully!');
} 