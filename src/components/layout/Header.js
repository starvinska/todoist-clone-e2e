import React, { useState } from 'react';
import { FaSun, FaMoon, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'firebase/auth';

import { useThemeMode } from '../../hooks/useThemeMode/useThemeMode';
import { useUser } from '../../hooks/useUser/useUser';
import { AddTask } from '../AddTask';
import { auth } from '../../firebase';

export const Header = () => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const { toggleMode, darkMode } = useThemeMode();
  const { user } = useUser();

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            {!!user && (
              <li className="settings__add">
                <button
                  data-testid="quick-add-task-action"
                  aria-label="Quick add task"
                  type="button"
                  onClick={() => {
                    setShowQuickAddTask(true);
                    setShouldShowMain(true);
                  }}
                >
                  <FaPlus size={18} />
                </button>
              </li>
            )}

            <li className="settings__darkmode">
              <button data-testid="dark-mode-action" aria-label="Darkmode on/off" type="button" onClick={toggleMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </li>
            {!!user && (
              <li className="settings__logout">
                <button
                  type="button"
                  onClick={() => {
                    signOut(auth);
                  }}
                >
                  <FaSignOutAlt size={18} />
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {!!user && (
        <AddTask
          showAddTaskMain={false}
          shouldShowMain={shouldShowMain}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      )}
    </header>
  );
};
