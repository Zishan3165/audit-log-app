import models from '../models/data-models/index.js';

export const saveLog = async (log) => {
  const model = new models.Log(log);
  const savedLog = await model.save();
  return savedLog;
};

export const getAllLogs = async (pageNumber = 0, filters = {}) => {
  const Log = models.Log;
  const logs = await Log.find(filters)
    .sort({ createdAt: -1 })
    .limit(10)
    .skip(pageNumber * 10)
    .populate('user')
    .populate('site');
  return logs;
};
