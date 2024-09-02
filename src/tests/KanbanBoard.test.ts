import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { defineComponent } from "vue";
import KanbanBoard from "@/components/KanbanBoard.vue";
import KanbanColumn from "@/components/KanbanColumn.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

const vuetify = createVuetify({
  components,
});

describe("KanbanBoard.vue", () => {
  let columns: { title: string, cards: { id: number, title: string, taskDescription: string }[] }[];

  beforeEach(() => {
    // Reset columns before each test
    columns = [
      {
        title: "Column 1",
        cards: [
          { id: 1, title: "Card 1", taskDescription: "Task 1" },
          { id: 2, title: "Card 2", taskDescription: "Task 2" },
        ],
      },
      {
        title: "Column 2",
        cards: [{ id: 3, title: "Card 3", taskDescription: "Task 3" }],
      },
    ];
  });

  const createWrapper = () => {
    const TestComponent = defineComponent({
      components: { KanbanBoard, VApp: components.VApp },
      setup() {
        return { columns };
      },
      template: `
        <v-app>
          <KanbanBoard :initialColumns="columns" />
        </v-app>
      `,
    });

    return mount(TestComponent, {
      global: {
        plugins: [vuetify],
      },
    });
  };

  it("renders the Kanban columns correctly", () => {
    const wrapper = createWrapper();
    const columnElements = wrapper.findAll(".kanban-column");
    expect(columnElements.length).toBe(columns.length);
  });

  it('emits dragStart event with correct arguments', () => {
    const wrapper = createWrapper();
    const kanbanColumn = wrapper.findComponent(KanbanColumn);

    kanbanColumn.vm.$emit('dragStart', 1, 1);

    const emittedEvents = kanbanColumn.emitted('dragStart');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents[0]).toEqual([1, 1]);
  });

  it("moveCard within column", () => {
    const wrapper = createWrapper();
    const kanbanColumn = wrapper.findComponent(KanbanColumn);
    const updatedColumns = wrapper.findComponent(KanbanBoard).props('initialColumns');

    kanbanColumn.vm.$emit('dragStart', 0, 2); // from column index, card id
    kanbanColumn.vm.$emit("moveCard", 0, 0);

    expect(updatedColumns[0].cards.length).toBe(2);
    expect(updatedColumns[1].cards.length).toBe(1);
    expect(updatedColumns[0].cards[0].id).toBe(2);
  });

  it("moveCard between columns", () => {
    const wrapper = createWrapper();
    const kanbanColumn = wrapper.findComponent(KanbanColumn);

    kanbanColumn.vm.$emit('dragStart', 0, 0); // from column index, card id
    kanbanColumn.vm.$emit("moveCard", 1, 1);

    const updatedColumns = wrapper.findComponent(KanbanBoard).props('initialColumns');
    expect(updatedColumns[0].cards.length).toBe(1);
    expect(updatedColumns[1].cards.length).toBe(2);
  });

  it("move card with moveCardBetweenColumns", () => {
    const wrapper = createWrapper();
    const kanbanColumn = wrapper.findComponent(KanbanColumn);
    const updatedColumns = wrapper.findComponent(KanbanBoard).props('initialColumns');

    kanbanColumn.vm.$emit('dragStart', 0, 2); // from column index, card id
    kanbanColumn.vm.$emit("moveCardBetweenColumns", 1); // to column index

    // Verify column state
    expect(updatedColumns[0].cards.length).toBe(1);
    expect(updatedColumns[1].cards.length).toBe(2);

  });
});
