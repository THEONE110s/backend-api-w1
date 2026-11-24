let repairRequests = [
  {
    id: 1,
    computerId: 101,
    symptom: "เปิดเครื่องไม่ติด หน้าจอดำ",
    status: "pending",
    technicianId: null,
    resultNote: ""
  },
  {
    id: 2,
    computerId: 102,
    symptom: "อินเทอร์เน็ตใช้งานไม่ได้",
    status: "in_progress",
    technicianId: 501,
    resultNote: "กำลังตรวจสอบสาย LAN"
  }
];

exports.getAllRequests = (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtered = repairRequests.filter(r => r.status === status);
    return res.status(200).json(filtered);
  }
  res.status(200).json(repairRequests);
};

exports.getRequestById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = repairRequests.find(r => r.id === id);

  if (!item) {
    return res.status(404).json({ message: "Request not found" });
  }
  res.status(200).json(item);
};

exports.createRequest = (req, res) => {
  const { computerId, symptom } = req.body;

  if (typeof computerId !== 'number' || !symptom || symptom.trim() === '') {
    return res.status(400).json({ message: "computerId (number) and symptom (non-empty string) are required" });
  }

  const newRequest = {
    id: repairRequests.length > 0 ? repairRequests[repairRequests.length - 1].id + 1 : 1,
    computerId,
    symptom: symptom.trim(),
    status: "pending",
    technicianId: null,
    resultNote: ""
  };

  repairRequests.push(newRequest);
  res.status(201).json(newRequest);
};

exports.updateRequest = (req, res) => {
  const id = parseInt(req.params.id);
  const index = repairRequests.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Request not found" });
  }

  const validStatuses = ['pending', 'in_progress', 'waiting_parts', 'done'];
  if (req.body.status && !validStatuses.includes(req.body.status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  repairRequests[index] = {
    ...repairRequests[index],
    ...req.body,
    id
  };

  res.status(200).json(repairRequests[index]);
};

exports.deleteRequest = (req, res) => {
  const id = parseInt(req.params.id);
  const index = repairRequests.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Request not found" });
  }

  repairRequests.splice(index, 1);
  res.status(204).send();
};