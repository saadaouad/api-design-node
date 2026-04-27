import { mockHabit, mockTag, mockUser } from '../mocks/seed.mock.ts';

import { db } from './connection.ts';
import { users, habits, entries, tags, habitTags } from './schema.ts';

const seed = async () => {
  console.log('Starting database seed...');

  try {
    console.log('Clearing existing data...');
    await db.delete(entries);
    await db.delete(habitTags);
    await db.delete(habits);
    await db.delete(tags);
    await db.delete(users);

    console.log('Creating demo users...');
    const [demoUser] = await db.insert(users).values(mockUser).returning();

    console.log('Creating tags...');
    const [healthTag] = await db.insert(tags).values(mockTag).returning();

    console.log('Creating habits...');
    const [exerciceHabit] = await db
      .insert(habits)
      .values({
        ...mockHabit,
        userId: demoUser.id
      })
      .returning();

    await db.insert(habitTags).values({
      habitId: exerciceHabit.id,
      tagId: healthTag.id
    });

    console.log('Adding completion entries...');

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      await db.insert(entries).values({
        habitId: exerciceHabit.id,
        completionDate: date
      });
    }

    console.log('DB seeded successfully');
  } catch (e) {
    console.error('seed failed', e);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default seed;
