import CalcEstimate from '../models/calcEstimate.model.js';
import CurrentJob from '../models/currentJob.model.js';
import { DateTime } from 'luxon';

export const createCurrentJob = async (req, res) => {
   try {
      const job = new CurrentJob(req.body);
      await job.save();
      res.status(201).json(job);
   } catch (error) {
      res.status(500).json({ message: 'Failed to create job', error: error.message });
   }
};
export const deleteCurrentJob = async (req, res) => {
   try {
      const job = await CurrentJob.findByIdAndDelete(req.params.id);
      if (!job) {
         return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json({ message: 'Job deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: 'Failed to delete job', error: error.message });
   }
};

export const getCurrentJobs = async (req, res) => {
   try {
      const jobs = await CurrentJob.find();
      res.status(200).json({ jobs });
   } catch (error) {
      res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
   }
};

export const getCurrentJobById = async (req, res) => {
   try {
      const job = await CurrentJob.findById(req.params.id);
      if (!job) return res.status(404).json({ message: 'Job not found' });
      res.status(200).json(job);
   } catch (error) {
      res.status(500).json({ message: 'Failed to fetch job', error: error.message });
   }
};




export const updateJobSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { schedule } = req.body;

        // Adjust the dates in the schedule to the Toronto time zone
        const adjustedSchedule = schedule.map(entry => ({
            ...entry,
            date: DateTime.fromISO(entry.date, { zone: 'America/Toronto' }).toISODate()
        }));

        const updatedJob = await CurrentJob.findByIdAndUpdate(
            id,
            { schedule: adjustedSchedule },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }

        res.status(200).json({
            success: true,
            job: updatedJob,
        });
    } catch (error) {
        console.error('Error updating job schedule:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update job schedule',
            error: error.message,
        });
    }
};



export const updateCurrentJob = async (req, res) => {
   try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedJob = await CurrentJob.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedJob) {
         return res.status(404).json({ message: 'Job not found' });
      }

      res.status(200).json(updatedJob);
   } catch (error) {
      res.status(500).json({ message: 'Failed to update job', error: error.message });
   }
};

export const updateCurrentJobStatus = async (req, res) => {
   try {
      const { status } = req.body;
      const job = await CurrentJob.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!job) return res.status(404).json({ message: 'Job not found' });
      res.status(200).json(job);
   } catch (error) {
      res.status(500).json({ message: 'Failed to update job status', error: error.message });
   }
};

export const addPaymentToJob = async (req, res) => {
   try {
      const { amount, note } = req.body;
      const job = await CurrentJob.findById(req.params.id);
      if (!job) return res.status(404).json({ message: 'Job not found' });

      job.payments.push({ amount, note });
      await job.save();
      res.status(200).json(job);
   } catch (error) {
      res.status(500).json({ message: 'Failed to add payment', error: error.message });
   }
};

export const addNoteToJob = async (req, res) => {
   try {
      const { text } = req.body;
      const job = await CurrentJob.findById(req.params.id);
      if (!job) return res.status(404).json({ message: 'Job not found' });

      job.notes.push({ text });
      await job.save();
      res.status(200).json(job);
   } catch (error) {
      res.status(500).json({ message: 'Failed to add note', error: error.message });
   }
};

export const addScheduleToJob = async (req, res) => {
   try {
       const { date, time, notes } = req.body;
       const job = await CurrentJob.findById(req.params.id);
       if (!job) return res.status(404).json({ message: 'Job not found' });

       // Adjust the date to the Toronto time zone
       const adjustedDate = DateTime.fromISO(date, { zone: 'America/Toronto' }).toISODate();

       job.progress.push({ date: adjustedDate, time, notes });
       await job.save();
       res.status(200).json(job);
   } catch (error) {
       res.status(500).json({ message: 'Failed to add schedule', error: error.message });
   }
};

export const updateEstimateStatus = async (req, res) => {
   try {
      const { id } = req.params;
      const { status } = req.body;

      console.log(`Request to update estimate ID: ${id} with status: ${status}`);

      const estimate = await CalcEstimate.findByIdAndUpdate(id, { status }, { new: true });
      if (!estimate) {
         console.error(`No estimate found with ID: ${id}`);
         return res.status(404).json({ message: 'Estimate not found' });
      }

      const jobStatuses = ['Job Pending', 'Job Waiting', 'Job In Progress'];
      if (jobStatuses.includes(status)) {
         let job = await CurrentJob.findOne({ estimate: id });
         if (!job) {
            job = new CurrentJob({ estimate: id, status });
            await job.save();
            console.log(`Created new job for estimate ID: ${id}`);
         } else {
            console.log(`Existing job found for estimate ID: ${id}`);
         }
      }

      res.status(200).json(estimate);
   } catch (error) {
      console.error(`Failed to update estimate status: ${error.message}`);
      res.status(500).json({ message: 'Failed to update estimate status', error: error.message });
   }
};
