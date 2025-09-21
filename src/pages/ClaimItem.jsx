import React, { useState } from "react";
import { Upload } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { db, storage } from "../../firebase.config"; // 👈 storage подключаем
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // 👈 добавляем нужные импорты

const ClaimItemPage = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    yourName: user?.displayName || "",
    emailAddress: user?.email || "",
    phoneNumber: "",
    itemDescription: "",
    additionalInformation: "",
    proofOfOwnership: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      proofOfOwnership: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let proofUrl = null;

      // 1. Загружаем файл в Storage, если он выбран
      if (formData.proofOfOwnership) {
        const file = formData.proofOfOwnership;
        const storageRef = ref(storage, `proofs/${Date.now()}-${file.name}`);

        await uploadBytes(storageRef, file);
        proofUrl = await getDownloadURL(storageRef);
      }

      // 2. Добавляем документ в Firestore
await addDoc(collection(db, "claims"), {
  yourName: formData.yourName,
  emailAddress: formData.emailAddress,
  phoneNumber: formData.phoneNumber,
  itemDescription: formData.itemDescription,
  additionalInformation: formData.additionalInformation,
  userId: user?.uid || null,  // ✅ не undefined
  createdAt: serverTimestamp(),
});


      alert("✅ Claim успешно отправлен!");
      setFormData({
        yourName: user?.displayName || "",
        emailAddress: user?.email || "",
        phoneNumber: "",
        itemDescription: "",
        additionalInformation: "",
        proofOfOwnership: null,
      });
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("❌ Ошибка при отправке. Попробуй снова.");
    }
  };

  const handleCancel = () => {
    setFormData({
      yourName: user?.displayName || "",
      emailAddress: user?.email || "",
      phoneNumber: "",
      itemDescription: "",
      additionalInformation: "",
      proofOfOwnership: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Claim Item</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Upload */}
            <div>
              <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64 mb-4">
                <span className="text-gray-400 text-6xl font-light">
                  400 × 300
                </span>
              </div>

              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <p className="text-blue-600 font-medium mb-2">
                  Upload Proof of Ownership
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="proof-upload"
                />
                <label
                  htmlFor="proof-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-blue-300 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Choose File
                </label>
                {formData.proofOfOwnership && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {formData.proofOfOwnership.name}
                  </p>
                )}
              </div>
            </div>

            {/* Right - Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Item
                </label>
                <textarea
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInformation"
                  value={formData.additionalInformation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimItemPage;
