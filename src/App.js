import React from 'react';
import './App.css';
import { GenericButton } from './components/Button';
import {
  modalModes,
  getInputSpec,
  groupTypes,
  inputTypes,
  placeholders,
  labels,
  getTabs,
  getHeaderItem,
  priorityTypes,
  taskStates,
  getButtonSpec,
  getSelectOption,
  colors,
  generateId
} from './utils';
import { GenericInput } from './components/Input';
import { GenericTab } from './components/Tab';
import { GenericTable } from './components/Table';
import { GenericForm } from './components/Form';
import moment from 'moment';
import { GenericModal } from './components/Modal';
import { GenericAlert } from './components/Alert';

class App extends React.Component {

  LOCALSTORAGE_KEY = "tasks";
  TEXT_MIN_LENGTH = 10;
  TEXT_MAX_LENGTH = 140;
  TEXTAREA_MIN_LENGTH = 10;
  TEXTAREA_MAX_LENGTH = 500;
  ALERT_TIMEOUT =  5 * 1000;

  priorityOptions = [
    getSelectOption(priorityTypes.NONE, labels.NONE),
    getSelectOption(priorityTypes.LOW, labels.LOW),
    getSelectOption(priorityTypes.MEDIUM, labels.MEDIUM),
    getSelectOption(priorityTypes.HIGH, labels.HIGH)
  ];

  groupByOptions = [
    getSelectOption(groupTypes.NONE, labels.NONE),
    getSelectOption(groupTypes.CREATED_ON, labels.CREATED_ON),
    getSelectOption(groupTypes.PENDING_ON, labels.PENDING_ON),
    getSelectOption(groupTypes.PRIORITY, labels.PRIORITY)
  ];

  constructor(props) {
    super(props);
    let savedTasks = undefined;
    if (typeof localStorage !== "undefined") {
      savedTasks = JSON.parse(localStorage.getItem(this.LOCALSTORAGE_KEY));
    }
    this.state = {
      groupBy: groupTypes.NONE,
      search: "",
      currentTab: labels.ALL,
      isOpen: false,
      editMode: modalModes.NEW,
      formValue: {
        summary: "",
        description: "",
        dueDate: "",
        priority: priorityTypes.NONE
      },
      tasks: savedTasks || [],
      isAscending: false,
    };
  }
  
  render () {
    const { groupBy, search, currentTab, isOpen, headerLabel, formValue, alerts } = this.state;
    const tabs = getTabs([labels.ALL, labels.PENDING, labels.COMPLETED], "text-primary", this.onTabClick);
    const groupBySpec = getInputSpec("groupBy", "groupBy", inputTypes.SELECT, labels.GROUP_BY, this.onGroupByChange, this.groupByOptions, undefined, undefined, "float-left");
    const searchSpec = getInputSpec("search", "search", inputTypes.TEXT, labels.SEARCH, this.onSearchChange, undefined, placeholders.SEARCH, undefined, "float-left");
    const tabContent = [{children: this.getTabContent()},{children: this.getTabContent(taskStates.OPEN)},{children: this.getTabContent(taskStates.COMPLETED)}];
    const modalBody = (<>{alerts && <GenericAlert alerts={alerts}/>}<GenericForm spec={this.getFormSpec()} formValue={formValue}/></>);
    return (
      <div className="App container mt-1">
        <div className="row">
          <h3 className="col text-left">{labels.TODO_APP}</h3>
          <div className="col col-sm-1 col-md-1">
            <GenericButton className="rounded-circle" icon="plus" color={colors.PRIMARY} onClick={this.toggleModal.bind(this, modalModes.NEW)}/>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <GenericInput value={groupBy} {...groupBySpec}/>
            </div>
            <div className="col-sm-12 col-md-8">
              <GenericInput value={search} {...searchSpec}/>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <GenericTab tabContent={tabContent} tabs={tabs} currentTab={currentTab}/>
        </div>
        {isOpen && <GenericModal isOpen={isOpen} toggle={this.toggleModal} modalHeader={headerLabel} modalBody={modalBody} modalFooter={this.getModalFooter()}/>}
      </div>
    );
  }

  getFormSpec = () => {
    const { editMode } = this.state;
    const readonly = (editMode === modalModes.READ_ONLY || editMode === modalModes.DELETE);
    return {
      inputSpecs: [
        getInputSpec("summary", "summary", inputTypes.TEXT, labels.SUMMARY, this.onInputChange, undefined, placeholders.SUMMARY, undefined, "float-left", readonly, this.TEXT_MIN_LENGTH, this.TEXT_MAX_LENGTH),
        getInputSpec("description", "description", inputTypes.TEXTAREA, labels.DESCRIPTION, this.onInputChange, undefined, placeholders.DESCRIPTION, undefined, "float-left", readonly, this.TEXTAREA_MIN_LENGTH, this.TEXTAREA_MAX_LENGTH),
        getInputSpec("dueDate", "dueDate", inputTypes.DATE_TIME_LOCAL, labels.DUE_DATE, this.onInputChange, undefined, undefined, undefined, "float-left", readonly),
        getInputSpec("priority", "priority", inputTypes.SELECT, labels.PRIORITY, this.onInputChange, this.priorityOptions, undefined, undefined, "float-left", readonly)
      ]
    };
  }

  getModalFooter = () => {
    const {editMode, formValue} = this.state;
    return (
      <>
        {
          editMode === modalModes.READ_ONLY &&
          <GenericButton label={labels.CLOSE} color={colors.SECONDARY} onClick={this.toggleModal}/>
        }
        {
          editMode !== modalModes.READ_ONLY && editMode !== modalModes.DELETE &&
          <>
            <GenericButton label={labels.CLOSE} color={colors.SECONDARY} onClick={this.toggleModal}/>
            <GenericButton label={labels.SAVE} color={colors.SUCCESS} onClick={this.saveTask}/>
          </>
        }
        {
          editMode === modalModes.DELETE &&
          <>
            <GenericButton label={labels.NO} color={colors.SUCCESS} onClick={this.toggleModal}/>
            <GenericButton label={labels.YES} color={colors.DANGER} onClick={this.deleteTask.bind(this, formValue.id)}/>
          </>
        }
      </>
    );
  }

  getHeaderItems = () => {
    const { sortType, isAscending, groupBy } = this.state;
    return [
      getHeaderItem(labels.SUMMARY, true, (sortType === "summary" && isAscending ? "sort-asc" : sortType === "summary" && !isAscending ? "sort-desc" : "sort"), this.onSortClick.bind(this, "summary")),
      getHeaderItem(labels.PRIORITY, groupBy !== "priority", (sortType === "priority" && isAscending ? "sort-asc" : sortType === "priority" && !isAscending ? "sort-desc" : "sort"), this.onSortClick.bind(this, "priority")),
      getHeaderItem(labels.CREATED_ON, groupBy !== "createdAt", (sortType === "createdAt" && isAscending ? "sort-asc" : sortType === "createdAt" && !isAscending ? "sort-desc" : "sort"), this.onSortClick.bind(this, "createdAt")),
      getHeaderItem(labels.DUE_BY, groupBy !== "dueDate", (sortType === "dueDate" && isAscending ? "sort-asc" : sortType === "dueDate" && !isAscending ? "sort-desc" : "sort"), this.onSortClick.bind(this, "dueDate")),
      getHeaderItem(labels.ACTIONS)
    ];
  }

  getTabContent = (type) => {
    const { groupBy } = this.state;
    return (
      <GenericTable
        bodyItems={type ? this.getBodyItems().map((group) => {
          return {
            label: group.label,
            items: group.items.filter((item) => item.currentState === type)
          }
        }) : this.getBodyItems()}
        bordered
        groupBy={groupBy}
        headerItems={this.getHeaderItems()}
      />
    );
  }

  onSortClick = (sortType) => {
    const { isAscending } = this.state;
    this.setState({sortType, isAscending: (this.state.sortType !== sortType) || !isAscending});
  }

  saveTask = () => {
    const { formValue, tasks, isOpen, editMode } = this.state;
    const { summary, description, dueDate } = formValue;
    const alerts = [];
    if (summary.length < this.TEXT_MIN_LENGTH || summary.length > this.TEXT_MAX_LENGTH) {
      alerts.push(`${labels.SUMMARY} must contain minimun ${this.TEXT_MIN_LENGTH} and maximum ${this.TEXT_MAX_LENGTH} characters`);
    }
    if (description.length < this.TEXTAREA_MIN_LENGTH || description.length > this.TEXTAREA_MAX_LENGTH) {
      alerts.push(`${labels.DESCRIPTION} must contain minimun ${this.TEXTAREA_MIN_LENGTH} and maximum ${this.TEXTAREA_MAX_LENGTH} characters`);
    }
    if (!dueDate) {
      alerts.push(`${labels.DUE_DATE} must be filled in`);
    }
    if (alerts.length > 0) {
      this.setState({alerts}, () => {
        setTimeout(() => {
          this.setState({alerts: undefined});
        }, this.ALERT_TIMEOUT);
      })
      return;
    }
    const createdAt = editMode === modalModes.EDIT ? {} : {createdAt: new Date().toISOString()};
    const id = editMode === modalModes.EDIT ? {} : {id: generateId(6)};
    const currentState = editMode === modalModes.EDIT ? {} : {currentState: taskStates.OPEN};
    const updatedTasks = [{...formValue, ...createdAt, ...id, ...currentState}, ...tasks];
    this.setState({tasks: updatedTasks, isOpen: !isOpen}, () => {
      this.setLocalStorage();
    });
  }

  setLocalStorage = () => {
    const {tasks} = this.state;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(tasks));
    }
  }

  getBodyItems = () => {
    const {groupBy, search, sortType, isAscending} = this.state;
    const tasks = search ? this.state.tasks.filter((task) => task.summary.toLowerCase().indexOf(search.toLowerCase()) > -1) : this.state.tasks;
    let bodyItems = [];
    if (groupBy !== groupTypes.NONE) {
      const groupedTasks = this.groupTasks();
      groupedTasks.forEach((value, key) => {
        bodyItems.push({
          label: groupBy === groupTypes.PRIORITY ? this.priorityOptions.find((option) => option.value === key).label : key,
          items: this.getItems(value).sort((item1, item2) => {
            if (item1.dataItem[sortType] > item2.dataItem[sortType]) {
              return isAscending ? 1 : -1;
            } else if (item1.dataItem[sortType] < item2.dataItem[sortType]) {
              return isAscending ? -1 : 1;
            } else {
              return 0;
            }
          })
        });
      })
    } else {
      bodyItems = [{items: this.getItems(tasks).sort((item1, item2) => {
            if (item1.dataItem[sortType] > item2.dataItem[sortType]) {
              return isAscending ? 1 : -1;
            } else if (item1.dataItem[sortType] < item2.dataItem[sortType]) {
              return isAscending ? -1 : 1;
            } else {
              return 0;
            }
          })}]
    }
    return bodyItems;
  }

  getItems = (tasks) => {
    const { currentTab } = this.state;
    return tasks.map((task) => {
      const {currentState} = task;
      return {
        dataItem: {
          summary: task.summary,
          priority: this.priorityOptions.find((option) => option.value === task.priority).label,
          createdAt: moment(task.createdAt).format("DD-MM-YYYY, HH:mm:SS"),
          dueDate: moment(task.dueDate).format("DD-MM-YYYY, HH:mm:SS")
        },
        onClick: this.toggleModal.bind(this, modalModes.READ_ONLY, task.id),
        currentState,
        strikeThrough: currentState === taskStates.COMPLETED && currentTab === labels.ALL,
        buttons: [
          getButtonSpec(colors.PRIMARY, this.toggleModal.bind(this, modalModes.EDIT, task.id), "edit"),
          getButtonSpec((task.currentState === taskStates.OPEN ? colors.SUCCESS : colors.INFO), this.toggleTaskState.bind(this, task.id), undefined, (task.currentState === taskStates.OPEN ? labels.DONE : labels.REOPEN)),
          getButtonSpec(colors.DANGER, this.toggleModal.bind(this, modalModes.DELETE, task.id), "trash"),
        ]
      }
    })
  }

  groupTasks = () => {
    const {groupBy, search} = this.state;
    const tasks = search ? this.state.tasks.filter((task) => task.summary.toLowerCase().indexOf(search.toLowerCase()) > -1) : this.state.tasks;
    const groupedTasks = new Map();
    tasks.forEach((task) => {
      const key = groupBy === groupTypes.PRIORITY ? task[groupBy] : moment(task[groupBy]).format("DD-MM-YYYY");
      if (groupedTasks.has(key)) {
        groupedTasks.set(key, [...groupedTasks.get(key), task])
      } else {
        groupedTasks.set(key, [task]);
      }
    });
    return groupedTasks;
  }

  onInputChange = (id, evt) => {
    const formValue = {...this.state.formValue};
    formValue[id] = evt.target.value;
    this.setState({formValue});
  }

  toggleTaskState = (id) => {
    const tasks = [...this.state.tasks];
    const foundIndex = tasks.findIndex((task) => task.id === id);
    tasks[foundIndex].currentState = tasks[foundIndex].currentState === taskStates.OPEN ? taskStates.COMPLETED : taskStates.OPEN;
    this.setState({tasks}, () => {
      this.setLocalStorage();
    });
  }

  deleteTask = (id) => {
    const {tasks, isOpen} = this.state;
    const foundIndex = tasks.findIndex((task) => task.id === id);
    this.setState({tasks: tasks.filter((task, ind) => ind !== foundIndex), isOpen: !isOpen}, () => {
      this.setLocalStorage();
    });
  }

  onTabClick = (currentTab) => {
    this.setState({currentTab});
  }

  onSearchChange = (id, evt) => {
    this.setState({search: evt.target.value});
  }

  onGroupByChange = (id, evt) => {
    this.setState({groupBy: evt.target.value});
  }

  toggleModal = (mode, id) => {
    const {isOpen, tasks} = this.state;
    switch(mode) {
      case modalModes.NEW:
        this.setState({editMode: modalModes.NEW, isOpen: !isOpen, headerLabel: labels.ADD_TASK, formValue: {summary: "", description: "", dueDate: "", priority: priorityTypes.NONE}});
        break;
      case modalModes.EDIT:
        this.setState({editMode: modalModes.EDIT, isOpen: !isOpen, headerLabel: labels.EDIT_TASK, formValue: tasks.find((task) => task.id === id)});
        break;
      case modalModes.READ_ONLY:
        this.setState({editMode: modalModes.READ_ONLY, isOpen: !isOpen, headerLabel: tasks.find((task) => task.id === id).summary, formValue: tasks.find((task) => task.id === id)});
        break;
      case modalModes.DELETE:
        this.setState({editMode: modalModes.DELETE, isOpen: !isOpen, headerLabel: labels.CONFIRM_DELETE, formValue: tasks.find((task) => task.id === id)});
        break;
      default:
        this.setState({isOpen: !isOpen});
    }
  }

}

export default App;
