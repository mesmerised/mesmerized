import * as Modules from '@modules';

// generate a list of all refresh functions
// for each of the module
const moduleKeys = Object.keys(Modules);
const refreshFunctions = moduleKeys.reduce((arr, m) => {
    const module = Modules[m];
    const { Actions = {} } = module;
    const refreshFn = Actions.refresh;

    refreshFn && arr.push(refreshFn);

    return arr;
}, []);

const { TodoList: TodoListModule = {} } = Modules;
const { Actions: TodoListModuleActions = {} } = TodoListModule;
const { toggleTodoList } = TodoListModuleActions;

const { Notes: NotesModule = {} } = Modules;
const { Actions: NotesModuleActions = {} } = NotesModule;
const { addItem } = NotesModuleActions;

export const refreshModules = () =>
    refreshFunctions.forEach(fn => fn());

export const toggleTodoListVisibility = () =>
    toggleTodoList && toggleTodoList();

export const addStickyNote = () =>
    addItem && addItem();
