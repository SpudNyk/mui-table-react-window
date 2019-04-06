import faker from 'faker/locale/en';

const generateData = count => {
    const items = [];
    for (let i = 0; i < count; i++) {
        const firstName = faker.name.firstName(1);
        const lastName = faker.name.lastName();
        const modified = faker.date.past(1);
        const created = faker.date.past(3, modified);
        const title = faker.lorem.sentence(5);
        const description = faker.lorem.paragraphs(3, '\n');
        items[i] = {
            firstName,
            lastName,
            created,
            modified,
            title,
            description
        };
    }
    items.sort((a, b) =>
        a.firstName > b.firstName ? 1 : a.firstName < b.firstName ? -1 : 0
    );
    return items;
};

export default generateData;
