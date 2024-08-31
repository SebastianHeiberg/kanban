import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import KanbanColumn from '@/components/KanbanColumn.vue';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

describe('KanbanColumn.vue', () => {
  const cards = [
    { id: 1, title: 'Card 1', taskDescription: 'Task 1' },
    { id: 2, title: 'Card 2', taskDescription: 'Task 2' },
  ];

  const createWrapper = (props = {}) => {
    return mount(KanbanColumn, {
      props: {
        title: 'Test Column',
        cards,
        columnIndex: 0,
        ...props,
      },
      global: {
        plugins: [vuetify],
      },
    });
  };

  it('renders the column title', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('h2').text()).toBe('Test Column');
  });

  it('renders the correct number of cards', () => {
    const wrapper = createWrapper();
    expect(wrapper.findAll('.v-col.kanban-card').length).toBe(cards.length);
  });

  it('has the correct index', () => {
    const wrapper = createWrapper();
    const column = wrapper.find('.kanban-column');
    expect(column.attributes('data-column-index')).toBe('0');
  });

  it('emits dragStart event when a card is dragged', async () => {
    const wrapper = createWrapper();
    const card = wrapper.find('.kanban-card');
    await card.trigger('dragstart');
    expect(wrapper.emitted().dragStart).toBeTruthy();
  });

  it('emits moveCard event when a card is dropped on another card', async () => {
    const wrapper = createWrapper();
    const card = wrapper.find('.kanban-card');
    await card.trigger('drop');
    expect(wrapper.emitted().moveCard).toBeTruthy();
  });

  it('emits moveCardBetweenColumns event when a card is dropped on the column', async () => {
    const wrapper = createWrapper();
    const column = wrapper.find('.kanban-column');
    await column.trigger('drop');
    expect(wrapper.emitted().moveCardBetweenColumns).toBeTruthy();
  });

  it('handles dragover events', async () => {
    const wrapper = createWrapper();
    const column = wrapper.find('.kanban-column');
    const event = new Event('dragover', { bubbles: true, cancelable: true });
    column.element.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });
});
