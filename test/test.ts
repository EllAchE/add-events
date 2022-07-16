import { extractDates } from '../src/scripts/utils';

test('properly identifies dates', () => {
  const americanDates = [
    {
      in: 'AMEIC 11/11/2034 and another 11/11/2034 and more 09/17/2023',
      out: ['11/11/2034', '11/11/2034', '09/17/2023'],
    },
    { in: 'AMEIC 11/11/2034', out: ['11/11/2034'] },
    { in: 'January 1991', out: [] },
    { in: 'GO USA why. On 09/22/2044 at 3', out: ['09/22/2044'] },
    { in: '1/2', out: ['1/2'] }, // it may be better to miss some than to worry about catching shorter
    { in: 'uni', out: [] },
    { in: 'on January 9 at 5pm', out: ['January 9'] },
    { in: 'on January 9, 2023 at 5pm', out: ['January 9, 2023'] },
    {
      in: 'on January 9, 2023 at 5pm and before April 12',
      out: ['January 9, 2023', 'April 12'],
    },
    { in: '11-11-22-22', out: [] },
    { in: '1', out: [] },
    { in: '1/1/22.', out: ['1/1/22'] },
    {
      in: 'THE PITCH\nRavyn Lenae Is Making Timeless R&B at Her Own Pace\nJuly 6, 2022\nOVERTONES\nThe Rise of Dissociation Music\n \nBy Jayson Greene\n \nJune 22, 2022\nRISING\nGrace Ives’ Hot Mess Anthems\n \nBy Cat Zhang\n \nJune 16, 2022\n5-10-15-20\nThe Neptunes’ Chad Hugo on the Music That Made Him\n \nBy Alphonse Pierre\n \nJune 14, 2022',
      out: ['July 6, 2022', 'June 22, 2022', 'June 16, 2022', 'June 14, 2022'],
    },
    {
      in: 'July 14, 2022',
      out: ['July 14, 2022'],
    },
  ];

  for (const i in americanDates) {
    expect(
      extractDates(americanDates[i].in).map((el) => {
        return el.date;
      })
    ).toEqual(americanDates[i].out);
  }
});
