const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.hasOwn(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
const formatTaskList = (tasksList) => {
    const initialColumns = [
        { id: 'to-do', title: 'To Do', tasks: [] },
        { id: 'inprogress', title: 'In Progress', tasks: [] },
        { id: 'under-review', title: 'Under Review', tasks: [] },
        { id: 'completed', title: 'Completed', tasks: [] }
    ];

    tasksList.forEach((group) => {
        const column = initialColumns.find(col => col.id === group.id);
        console.log(column)
        if (column) {
            column.tasks = group.tasks
        }
        return column
    });
    
    return initialColumns
};


module.exports = { pick, formatTaskList }