import React, { Component } from "react";
import SavedResults from "../SavedResults/SavedResults";
import SearchResults from "../SearchResults/SearchResults";
import Results from "../Results/Results";
import API from "../utils/api";

class Main extends Component {

    state = {
        topic: "",
        startYear: "",
        endYear: "",
        articles: [],
        saved: []
    };


    componentDidMount() {
        this.getSavedArticles()
    }

    getSavedArticles = () => {
        API.getArticle()
            .then((res) => {
                this.setState({ saved: res.data });
            });
    }

    renderArticles = () => {
        return this.state.articles.map(article => (
            <Results
                _id={article._id}
                key={article._id}
                title={article.headline.main}
                date={article.pub_date}
                url={article.web_url}
                handleSaveButton={this.handleSaveButton}
                getSavedArticles={this.getSavedArticles}
            />
        ));
    }

    renderSaved = () => {
        return this.state.saved.map(save => (
            <SavedResults
                _id={save._id}
                key={save._id}
                title={save.title}
                date={save.date}
                url={save.url}
                handleDeleteButton={this.handleDeleteButton}
                getSavedArticles={this.getSavedArticles}
            />
        ));
    }

    handleTopicChange = (event) => {
        this.setState({ topic: event.target.value });
    }

    handleStartYearChange = (event) => {
        this.setState({ startYear: event.target.value });
    }

    handleEndYearChange = (event) => {
        this.setState({ endYear: event.target.value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Getting NYT Articles");
        console.log("Topic: ", this.state.topic);
        console.log("Start Year: ", this.state.startYear);
        console.log("End Year: ", this.state.endYear);
        API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
            .then((res) => {
                this.setState({ articles: res.data.response.docs });
                console.log("Articles: ", this.state.articles);
            });
    }

    handleSaveButton = (id) => {
        const findArticleByID = this.state.articles.find((el) => el._id === id);
        console.log("findArticleByID: ", findArticleByID);
        const newSave = { title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url };
        API.saveArticle(newSave)
            .then(this.getSavedArticles());
    }

    handleDeleteButton = (id) => {
        API.deleteArticle(id)
            .then(this.getSavedArticles());
    }

    render() {
        return (

            <div className="main-container">
                <div className="container">

                    <div className="jumbotron">
                        <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
                        <h2 className="text-center">Search for and save articles of interest.</h2>
                    </div>

                    <SearchResults
                        handleTopicChange={this.handleTopicChange}
                        handleStartYearChange={this.handleStartYearChange}
                        handleEndYearChange={this.handleEndYearChange}
                        handleFormSubmit={this.handleFormSubmit}
                        renderArticles={this.renderArticles}
                    />

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            <strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                                        </h3>
                                    </div>
                                    <div className="panel-body">
                                        <ul className="list-group">
                                            {this.renderSaved()}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <h3 class="white-text">Link</h3>
                        <a class="grey-text text-lighten-3" id='link' target='_blank' href="https://github.com/Avickerman/Clicky-Game">My GitHub Repo</a>
                    </footer>
                </div>
            </div>

        );
    }

}

export default Main;