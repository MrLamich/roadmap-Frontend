import React, {useState} from "react";
import Modal from "./Modal";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ruLocale from 'date-fns/locale/ru';

const localeMap = {
    ru: ruLocale
};

const maskMap = {
    ru: '__.__.____'
};

export function AddTask(props){
    const [idCounter, setIdCounter] = useState(0);
    function getId(){
        setIdCounter(idCounter + 1);
        return idCounter.toString();
    }

    const [state, setState] = useState([])
    function addNewItem(){
        const oldState = state;
        const newItem = {x: 1, y: 1, w: 1, h: 1, i: getId(), roadmapName: value};
        setState(oldState.concat([newItem]));
        {props.reciveNewTask(state);}
    }
    const [modalActive, setModalActive] = useState(false)
    const [value, setValue] = useState(0);
    const [value1, setValue1] = React.useState(new Date());
    const [value2, setValue2] = React.useState(null);
    const locale = 'ru';
    function handleChange(event) {
        setValue(event.target.value);
    }

    return(
        <div>
            <button className="open-btn" onClick={() => setModalActive(true)}>
                Добавление задачи
            </button>
            <Modal active={modalActive} setActive={setModalActive}>
                <form action="">
                    <text>Задача</text>
                    <input value={value} onChange={handleChange}/><br/>
                    <text>Дата начала: </text>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                        <DatePicker
                            mask={maskMap[locale]}
                            value={value1}
                            onChange={(newValue) => {
                                setValue1(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider><br/>
                    <text>Дата конца: </text>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                        <DatePicker
                            mask={maskMap[locale]}
                            value={value2}
                            onChange={(newValue) => {
                                setValue2(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider><br/>
                    <text>Цвет задачи: </text>
                </form>
                <button onClick={addNewItem}>
                    Add item
                </button>
            </Modal>
        </div>
    );
}