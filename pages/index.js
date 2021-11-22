import Head from "next/head";
import { useState } from "react";
import classes from "../styles/Home.module.css";

export default function Home() {
    const [name, setName] = useState("");
    const [numberOfTeams, setNumberOfTeams] = useState(0);
    const [users, setUsers] = useState({});
    const [teams, setTeams] = useState({});
    const [showTeams, setShowTeams] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleTeamChange = (e) => {
        setNumberOfTeams(e.target.value);
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        let tempUsers = { ...users };
        tempUsers[name] = 1;
        setUsers(tempUsers);
        setName(" ");
    };

    const handleGenerateTeams = () => {
        if (numberOfTeams === 0) {
            alert("Enter Number of teams ");
        }
        let tempUsers = Object.keys(users);
        const teamSize = Math.floor((tempUsers.length - 1) / numberOfTeams);
        let teams = {};
        for (let i = 0; i < numberOfTeams; i++) {
            teams[i] = [];
            let currentTeamSize = 0;
            while (currentTeamSize <= teamSize) {
                let randomPosition = Math.floor(Math.random() * (tempUsers.length - 1 - 0 + 1) + 0);
                teams[i].push(tempUsers[randomPosition]);
                currentTeamSize++;
                tempUsers.splice(randomPosition, 1);
            }
        }
        setTeams(teams);
        setShowTeams(true);
    };
    return (
        <div className={classes.main}>
            <Head>
                <title>Team io</title>
                <meta name="description" content="Randomly generate team members" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={classes.card}>
                <div>
                    <h3>Random 🌚 Team Generator</h3>
                </div>

                <div>
                    <form onSubmit={handleAddMember}>
                      <label>Player Name</label>
                      <br/>
                        <input
                            type="text"
                            placeholder="Enter name"
                            name="player name"
                            value={name}
                            onChange={handleChange}
                        />
                        <button className={classes.player} type="submit">Add Player</button>
                    </form>
                </div>

                <div>
                  <label>Team SIze </label>
                  <br/>
                    <input
                        type="number"
                        placeholder="Team size"
                        name="numberOfTeams"
                        value={numberOfTeams}
                        onChange={handleTeamChange}
                    />
                </div>

                <div>
                    {Object.keys(users).length > 0 && !showTeams && (
                        <>
                            <h3>Player Names</h3>
                            <div className={classes.names}>
                                {Object.keys(users).map((user, id) => (
                                    <div key={id}>{user} </div>
                                ))}
                            </div>

                            <button className={classes.button} onClick={handleGenerateTeams}>Generate Teams</button>
                        </>
                    )}

                    {Object.keys(teams).length > 0 && showTeams && (
                        <>
                            <h3>Generated Teams</h3>
                            <div className={classes.teams}>
                                {Object.keys(teams).map((team, id) => (
                                    <div key={id}>
                                        <p className={classes.gen}>Team {Number(team) + 1}</p>
                                        {teams[team].map((member, id) => (
                                            <p key={id}>{member}</p>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <button className={classes.button} onClick={handleGenerateTeams}>Regenerate Teams</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
