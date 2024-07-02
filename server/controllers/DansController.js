const DansService = require("../services/DansService");
const BaseResponse = require("../response/BaseResponse");
const Logger = require("../helpers/Logger");
const GetDansListResponse = require("../response/GetDansListResponse");
const GetDansDetailResponse = require("../response/GetDansDetailResponse");

const getDansList = async (req, res) => {
  try {
    const result = await DansService.getDansList(req.query);
    const response = GetDansListResponse(result);

    Logger.info(response);
    res.send(BaseResponse.successResponse(response));
  } catch (err) {
    Logger.error(err);
    res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
  }
};

const getDansDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const result = await DansService.getDansDetail(id);
    const response = GetDansDetailResponse(result);

    Logger.info(response);
    res.send(BaseResponse.successResponse(response));
  } catch (err) {
    Logger.error(err);
    res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
  }
};

module.exports = {
  getDansList: getDansList,
  getDansDetail: getDansDetail,
};
