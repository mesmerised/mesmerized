import React, { Component } from 'react';
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import { Container as BackgroundContainer } from '@modules/background';
import { Container as QuotesContainer } from '@modules/quotes';
import { Container as ClockContainer } from '@modules/clock';
import { Container as WeatherContainer } from '@modules/weather';
import { Container as TodoListContainer } from '@modules/todolist';
import { Container as NotesContainer } from '@modules/notes';
import SettingsIcon from '@components/SettingsIcon';
import RefreshIcon from '@components/RefreshIcon';
import TodoListIcon from '@components/TodoListIcon';
import NotesIcon from '@components/NotesIcon';
import FaCogs from 'react-icons/lib/fa/cogs';
import './TabPage.css';

class TabPage extends Component {
    render() {
        return (
            <Layout>
                <BackgroundContainer />
                <Panel>
                    <div className="panel">
                        <div className="panel__topContainer panel__topContainer_right">
                            <div>
                                <div className="panel__topContainer__icon">
                                    <FaCogs />
                                </div>
                            </div>
                            <div className="control">
                                <SettingsIcon />
                                <RefreshIcon />
                                <TodoListIcon />
                                <NotesIcon />
                            </div>
                        </div>
                        <div className="panel__draggableContainer panel__draggableContainer_left">
                            <NotesContainer />
                        </div>
                        <div className="panel__draggableContainer panel__draggableContainer_right">
                            <TodoListContainer />
                        </div>
                        <div className="panel__topContainer panel__topContainer_left">
                            <WeatherContainer />
                        </div>
                        <div className="panel__centerContainer">
                            <ClockContainer />
                        </div>
                        <div className="panel__bottomContainer">
                            <QuotesContainer />
                        </div>
                    </div>
                </Panel>
            </Layout>
        );
    }
}

export default TabPage;
