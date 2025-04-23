import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCategoryForm } from "./redux/reducers/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const { formStatus, loading, error } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendCategoryForm(formData));  // Formu göndər
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Email adress" 
        />
        <input 
          type="text" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Tesvir" 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Göndərilir...' : 'Göndər'}
        </button>
      </form>

      {formStatus === 'success' && <div>Forma uğurla göndərildi!</div>}
      {formStatus === 'error' && <div>{error || 'Bir xəta baş verdi'}</div>}
    </div>
  );
};

export default App;
