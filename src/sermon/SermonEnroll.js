import React from 'react';
import {useState, useRef} from "react";
import {Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditorForm from "./EditorForm";
import {EditorState, convertToRaw} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {postSave, getSermonList, getSermonById} from "./api/SermonApi";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const tabUseStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function SermonEnroll() {
    const classes = useStyles();
    const [preacher, setPreacher] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [sermonEditorState, setSermonEditorState] = useState(EditorState.createEmpty());
    const [sequenceEditorState, setSequenceEditorState] = useState(EditorState.createEmpty());
    const [sequence, setSequence] = useState('');
    const [sermon, setSermon] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const preacherChangeHandler = (event) => {
        setPreacher(event.target.value);
    };

    const categoryChangeHandler = (event) => {
        setCategory(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const sermonTextChangeHandler = (editorState) => {
        setSermon(draftToHtml(convertToRaw(editorState.getCurrentContent())).toString());
        setSermonEditorState(editorState);
    };
    const sequenceChangeHandler = (editorState) => {
        setSequence(draftToHtml(convertToRaw(editorState.getCurrentContent())).toString());
        setSequenceEditorState(editorState);
    };
    const titleHandler = (event) => {
        setTitle(event.target.value)
    }
    const urlHandler = (event) => {
        setUrl(event.target.value)
    }
    const saveHandler = async (event) => {
        let result = await postSave({
            sermonKindId: 1,
            preacherId: 1,
            title: title,
            content: sermon,
            sermon_date: selectedDate,
            url: url,
            sequence: sequence
        })
        console.log(result);
    }

    return(
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="설교 제목" onChange={titleHandler} />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="설교 영상 URL" onChange={urlHandler} />
            </form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="예배 날짜 선택"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <FormControl className={classes.formControl}>
                <InputLabel id="preacher">설교자</InputLabel>
                <Select
                    labelId="preacher"
                    id="demo-simple-select-helper"
                    value={preacher}
                    onChange={preacherChangeHandler}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>알맞은 설교자를 선택해주세요</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="sermon-category">예배 카테고리</InputLabel>
                <Select
                    labelId="sermon-category"
                    id="demo-simple-select-helper"
                    value={category}
                    onChange={categoryChangeHandler}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>알맞은 예배 카테고리를 선택해주세요</FormHelperText>
            </FormControl>
            <EditorTabs
                sermonHandler={sermonTextChangeHandler}
                sequenceHandler={sequenceChangeHandler}
                sermonState={sermonEditorState}
                sequenceState={sequenceEditorState}
            />
            <Button variant={"contained"} color={"primary"} onClick={saveHandler} >저장</Button>
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function EditorTabs({sermonHandler, sequenceHandler, sermonState, sequenceState}) {
    const classes = tabUseStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    centered
                >
                    <Tab label="텍스트 설교" {...a11yProps(0)} />
                    <Tab label="예배 순서" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <EditorForm
                value={value}
                index={0}
                title={"텍스트 설교를 입력해주세요"}
                handler={sermonHandler}
                editorState={sermonState}
            />
            <EditorForm
                value={value}
                index={1}
                title={"예배 순서를 입력해주세요"}
                handler={sequenceHandler}
                editorState={sequenceState}
            />
        </div>
    );
}

export default SermonEnroll;