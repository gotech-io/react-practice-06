import { useState } from 'react';
import FetchToDoList from './FetchToDoList';
import CompletedToggle from './CompletedToggle';
import consts from './consts';

const ToDoListPage = () => {
  const [showCompleted, setShowCompleted] = useState(true);

  return (
    <>
      <CompletedToggle
        text="Show Completed"
        initialState={showCompleted}
        onChange={setShowCompleted}
      />
      <FetchToDoList url={consts.serverUrl} showCompleted={showCompleted} />
    </>
  );
};

export default ToDoListPage;
