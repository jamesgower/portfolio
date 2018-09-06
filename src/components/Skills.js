import React from "react";
import Headroom from "react-headroom";
import NavBar from "./NavBar";
import CircularProgressBar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default class Skills extends React.Component {
    constructor() {
        super();
        this.reactSkillBar = React.createRef();
        this.state = {
            desktop: window.innerWidth > 768,
            mobile: window.innerWidth < 576,
            modalChoice: "design",
            frontEndPercent: 0,
            backEndPercent: 0,
            designPercent: 0,
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions);
        const {
            reactSkillBar,
            reduxSkillBar,
            javascriptSkillBar,
            htmlSkillBar,
            nodeSkillBar,
            expressSkillBar,
            mongoSkillBar,
            gitSkillBar,
        } = this.refs;

        setTimeout(() => {
            this.setState({ frontEndPercent: 80 });
        }, 600);

        setTimeout(() => {
            reactSkillBar.classList.add("eightyPercent");
        }, 900);

        setTimeout(() => {
            reduxSkillBar.classList.add("seventyPercent");
        }, 1200);

        setTimeout(() => {
            javascriptSkillBar.classList.add("eightyPercent");
        }, 1500);

        setTimeout(() => {
            htmlSkillBar.classList.add("ninetyFivePercent");
        }, 1800);

        setTimeout(() => {
            this.setState({ backEndPercent: 65 });
        }, 2600);

        setTimeout(() => {
            nodeSkillBar.classList.add("seventyPercent");
        }, 2900);

        setTimeout(() => {
            expressSkillBar.classList.add("eightyPercent");
        }, 3200);

        setTimeout(() => {
            mongoSkillBar.classList.add("seventyPercent");
        }, 3500);

        setTimeout(() => {
            gitSkillBar.classList.add("sixtyPercent");
        }, 3800);

        setTimeout(() => {
            this.setState({ designPercent: 70});
        }, 4600);

        setTimeout(() => {
            
        }, 4900);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        let desktop = window.innerWidth > 768;
        let mobile = window.innerWidth < 576;

        this.setState({ desktop, mobile });
    };

    render() {
        const { frontEndPercent, backEndPercent, designPercent } = this.state;
        return (
            <div className="background">
                <Headroom>
                    <NavBar />
                </Headroom>
                <div className="content-container">
                    <h1 className="skills--title">Skills</h1>
                    <div className="row">
                        <div className="col-4">
                            <div className="mainSkill--container">
                                <CircularProgressBar
                                    percentage={frontEndPercent}
                                    text="Front-End"
                                    initialAnimation={true}
                                    strokeWidth={4}
                                    className="animated bounceIn"
                                />
                            </div>
                        </div>
                        <div className="col-8 frontEndSkills">
                            <div className="skill--container">
                                <div className="progressbar react-bar" ref="reactSkillBar" />
                                <p className="skill--label">React</p>
                            </div>
                            <div className="skill--container">
                                <div className="progressbar redux-bar" ref="reduxSkillBar" />
                                <p className="skill--label">Redux</p>
                            </div>
                            <div className="skill--container">
                                <div
                                    className="progressbar javascript-bar"
                                    ref="javascriptSkillBar"
                                />
                                <p className="skill--label">Vanilla JavaScript</p>
                            </div>
                            <div className="skill--container">
                                <div className="progressbar html-bar" ref="htmlSkillBar" />
                                <p className="skill--label">HTML5</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mainSkill--container animated bounceIn backend-delay">
                                <CircularProgressBar
                                    percentage={backEndPercent}
                                    text="Back-End"
                                    strokeWidth={4}
                                />
                            </div>
                        </div>
                        <div className="col-8 backEndSkills">
                            <div className="skill--container">
                                <div className="progressbar node-bar" ref="nodeSkillBar" />
                                <p className="skill--label">Node.JS</p>
                            </div>
                            <div className="skill--container">
                                <div className="progressbar express-bar" ref="expressSkillBar" />
                                <p className="skill--label">Express.JS</p>
                            </div>
                            <div className="skill--container">
                                <div className="progressbar mongo-bar" ref="mongoSkillBar" />
                                <p className="skill--label">MongoDB</p>
                            </div>
                            <div className="skill--container">
                                <div className="progressbar git-bar" ref="gitSkillBar" />
                                <p className="skill--label">Git</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mainSkill--container animated bounceIn design-delay">
                                <CircularProgressBar
                                    percentage={designPercent}
                                    text="Design"
                                    strokeWidth={4}
                                />
                            </div>
                        </div>
                        <div className="col-8 designSkills ">
                            <div className="skill--container">
                                <div className="progressbar css-bar" ref="cssSkillBar" />
                                <p className="skill--label">CSS3</p>
                            </div>
                            <div className="skill--container">
                                <div className="progressbar sass-bar" ref="sassSkillBar" />
                                <p className="skill--label">SASS/SCSS</p>
                            </div>
                            <div className="skill--container">
                                <div className="progressbar bootstrap-bar" ref="bootstrapSkillBar" />
                                <p className="skill--label">Bootstrap/Reactstrap</p>
                            </div>
                            <div className="skill--container">
                                <div className="progressbar java-bar" ref="javaSkillBar" />
                                <p className="skill--label">Java</p>
                            </div>
                        </div>
                    </div>

                    <img src="https://www.codewars.com/users/jamesgower94/badges/large" />
                </div>
            </div>
        );
    }
}
