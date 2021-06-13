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
    const [age, setAge] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return(
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="설교 제목" />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="설교 영상 URL" />
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
                    value={age}
                    onChange={handleChange}
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
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>알맞은 예배 카테고리를 선택해주세요</FormHelperText>
            </FormControl>
            <SimpleTabs />
            <Button variant={"contained"} color={"primary"} >저장</Button>
            <Button variant={"contained"} color={"primary"} >수정</Button>
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function SimpleTabs() {
    const classes = tabUseStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="텍스트 설교" {...a11yProps(0)} />
                    <Tab label="예배 순서" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <EditorForm value={value} index={0} />
            <EditorForm value={value} index={1} />
        </div>
    );
}

export default SermonEnroll;