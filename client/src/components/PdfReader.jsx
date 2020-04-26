import React, { Component } from 'react';
import { Page } from "react-pdf";
import { Document } from 'react-pdf/dist/entry.webpack';
import {Button, ButtonGroup} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles, useTheme } from '@material-ui/core/styles';

class PdfReader extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    onePageBack = () => {
        if (this.state.pageNumber > 1) {
            console.log("page back");
            this.setState({pageNumber: this.state.pageNumber - 1});
        }
    };

    onePageForward = () => {
        if (this.state.pageNumber < this.state.numPages) {
            console.log("page forward");
            this.setState({pageNumber: this.state.pageNumber + 1});
        }
    };

    render() {
        // const { pageNumber, numPages } = this.state;

        return (
            <div>
                <ButtonGroup color="primary" aria-label="outlined button group">
                    <Button onClick={this.onePageBack}><NavigateBeforeIcon />Prev Page</Button>
                    <Button onClick={this.onePageForward}>Next Page<NavigateNextIcon /></Button>
                </ButtonGroup>
                <Document
                    file="https://cs161.org/assets/projects/1/project1-problems.pdf"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    onLoadError={console.error}
                >
                    <Page pageNumber={this.state.pageNumber} />
                </Document>
                <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
            </div>
        );
    }
}

export default PdfReader;