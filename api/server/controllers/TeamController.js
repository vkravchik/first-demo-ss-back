import TeamService from '../services/TeamService';
import Util from '../utils/Utils';


const util = new Util();
const messages = require('../../messages.env');

class TeamController {
    static async getAllTeams(req, res) {
        try {
            const teams = await TeamService.getAll();
            if (teams.length > 0) {
                util.setSuccess(200, 'Teams', teams);
            } else {
                util.setSuccess(204, messages.GENERAL.EMPTY_RESULT);
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async addTeam(req, res) {
        if (!req.body.project || !req.body.user) {
            util.setError(400, messages.GENERAL.PROVIDE_COMPLETE_DETAILS);
            return util.send(res);
        }
        const newTeam = req.body;
        try {
            const createdTeam = await TeamService.add(newTeam);
            util.setSuccess(201, 'Team Added!', createdTeam);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedTeam(req, res) {
        const alteredTeam = req.body;
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, messages.GENERAL.PROVIDE_COMPLETE_DETAILS);
            return util.send(res);
        }
        try {
            const updateTeam = await TeamService.update(id, alteredTeam);
            if (!updateTeam) {
                util.setError(204, messages.GENERAL.EMPTY_RESULT);
            } else {
                util.setSuccess(200, 'Team updated', updateTeam);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getATeam(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }

        try {
            const theTeam = await TeamService.getA(id);

            if (!theTeam) {
                util.setError(204, messages.GENERAL.EMPTY_RESULT);
            } else {
                util.setSuccess(200, 'Found Team', theTeam);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getATeamByProject(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }

        try {
            const theTeam = await TeamService.getATeamByProject(id);

            if (!theTeam) {
                util.setError(204, messages.GENERAL.EMPTY_RESULT);
            } else {
                util.setSuccess(200, 'Found Team', theTeam);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteTeam(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }

        try {
            const teamToDelete = await TeamService.delete(id);

            if (teamToDelete) {
                util.setSuccess(200, 'Team deleted');
            } else {
                util.setError(204, messages.GENERAL.EMPTY_RESULT);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addTemToProject(req, res) {
        const {project, developers, maintainers} = req.body;

        if (!Number(project)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }

        try {
            // Call service function with two params | mai, dev
            const result = await TeamService.addTeamMates(project, maintainers, developers);
            util.setSuccess(200, `Team Mates added to Team for Project ${project}`, result);

            // TeamService.sendToken(project, developers, maintainers);

            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getAProjectWhereUserExist(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }

        try {
            const theProject = await TeamService.getAProjectWhereUserExist(id);

            if (!theProject) {
                util.setError(204, `Cannot find projects with the user id ${id}`);
            } else {
                util.setSuccess(200, 'Found Project', theProject);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    // static async sendToken(req, res) {
    //     try {
    //         let result = await TeamService.sendToken();
    //
    //         if (result) {
    //             util.setSuccess(200, 'Found Project', result);
    //         } else {
    //             util.setError(404, 'Cant Send email');
    //         }
    //         return util.send(res);
    //     } catch (error) {
    //         util.setError(404, error);
    //         return util.send(res);
    //     }
    // }

    // static async acceptInvite(req, res) {
    //     const {key, token} = req.params;
    //
    //     const result = await TeamService.acceptInviteToProject(key, token);
    //     if (result) {
    //         util.setSuccess(200, 'Accepted', result);
    //     } else {
    //         util.setError(404, `Accepting error`);
    //     }
    //     return util.send(res);
    // }
}

export default TeamController;
