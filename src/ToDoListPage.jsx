import { useState } from 'react';
import FetchToDoList from './FetchToDoList';
import CompletedToggle from './CompletedToggle';

const ToDoListPage = () => {
  const [showCompleted, setShowCompleted] = useState(true);

  return (
    <>
      <CompletedToggle
        text="Show Completed"
        initialState={showCompleted}
        onChange={setShowCompleted}
      />
      <FetchToDoList showCompleted={showCompleted} />
    </>
  );
};

export default ToDoListPage;
