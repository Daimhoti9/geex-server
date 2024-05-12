const Appointment = require('../Models/Appointments');

const addAppointment = async (req, res) => {
    try {
        const {title, time, date, description, phone, email, name, surname} = req.body.formData;

        console.log(req.body.type);

        const appointment = new Appointment({
            name: name,
            surname: surname,
            phone: phone,
            email: email,
            title: title,
            time: time,
            date: date,
            description: description,
            type: req.body.type,
        });
        const savedAppointment = await appointment.save();
        res.status(200).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllAppointments = async (req, res) => {
    try{
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStatus = async (req, res) => {
    try{
        const id = req.body.appointment._id
        const status = req.body.status;
        const appointment = await Appointment.findById(id);
        appointment.status = status;
        const savedAppointment = await appointment.save();
        res.status(200).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { addAppointment, getAllAppointments, updateStatus  }

