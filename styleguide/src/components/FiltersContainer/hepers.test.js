import { getInitialSelectedItems } from './helpers';
import { checkboxItems } from '../../../../__test__/fixtures/common/DropdownItems';

describe('getInitialSelectedItems fn', () => {
  const selectedItems = checkboxItems.filter(({ checked }) => checked);
  const filter = {
    id: 'Filter1',
    title: 'Filter 1',
    Component: jest.fn(),
    initialSelectedItems: selectedItems,
    props: { items: checkboxItems }
  };

  it('should return the initial selected items of the filters', () => {
    const initialSelectedItems = getInitialSelectedItems([filter, { ...filter, id: 'Filter2' }]);
    expect(initialSelectedItems).toEqual({ Filter1: selectedItems, Filter2: selectedItems });
  });
});
