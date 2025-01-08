import React, { useState } from 'react';
import { FaUser, FaPhone, FaAddressCard, FaIdCard } from 'react-icons/fa';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        aadhar: ''
    });
    const [errors, setErrors] = useState({});
    const [language, setLanguage] = useState('tamil');

    const labels = {
        tamil: {
            name: 'பெயர்',
            phone: 'தொலைபேசி எண்',
            address: 'முகவரி',
            aadhar: 'ஆதார் அட்டை எண்',
            submit: 'சமர்ப்பிக்கவும்',
            required: 'தேவை',
            phoneError: 'தொலைபேசி எண் 10 இலக்கங்கள் இருக்க வேண்டும்',
            aadharError: 'ஆதார் அட்டை எண் 12 இலக்கங்கள் இருக்க வேண்டும்'
        },
        english: {
            name: 'Name',
            phone: 'Phone Number',
            address: 'Address',
            aadhar: 'Aadhar Card Number',
            submit: 'Submit',
            required: 'is required',
            phoneError: 'Phone number must be 10 digits',
            aadharError: 'Aadhar card number must be 12 digits'
        }
    };

    const validate = () => {
        const newErrors = {};
        const lang = labels[language];

        if (!formData.name.trim()) newErrors.name = `${lang.name} ${lang.required}`;
        if (!formData.phone.trim()) newErrors.phone = `${lang.phone} ${lang.required}`;
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = lang.phoneError;
        if (!formData.address.trim()) newErrors.address = `${lang.address} ${lang.required}`;
        if (!formData.aadhar.trim()) newErrors.aadhar = `${lang.aadhar} ${lang.required}`;
        else if (!/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = lang.aadharError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) validate();
    };

    const toggleLanguage = () => setLanguage((prev) => (prev === 'tamil' ? 'english' : 'tamil'));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            alert('Form submitted successfully!');
            setFormData({ name: '', phone: '', address: '', aadhar: '' });
        }
    };

    const progress = Math.round(
        (Object.values(formData).filter((value) => value.trim() !== '').length / 4) * 100
    );
    const lang = labels[language];

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end align-items-center mb-2">
                <button className="btn btn-sm btn-primary" onClick={toggleLanguage}>
                    {language === 'tamil' ? 'English' : 'தமிழ்'}
                </button>
            </div>

            <form className='form' onSubmit={handleSubmit}>
                <div className='d-flex align-items-center gap-2 mb-2'>
                    <svg width="31" height="40" viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.37022 17.9534L7.16472 15.3533L1.20508 21.313C1.96866 23.1257 3.07963 24.7927 4.4967 26.2098C4.4967 26.2098 5.02042 23.4179 7.75969 21.1014C8.25191 20.6851 7.95943 19.6247 7.0998 19.4389C6.50307 19.2135 6.1838 18.5635 6.37022 17.9534Z" fill="#422520"></path>
                        <path d="M23.3078 21.848C24.0635 22.6025 24.6987 23.4457 25.2064 24.3649C25.1992 24.3284 25.1906 24.2926 25.1796 24.2582C24.6355 22.5581 24.668 21.0847 24.9935 20.2662C25.1089 19.9762 24.9719 19.6477 24.6835 19.5286L23.2392 18.9321C23.0549 18.856 22.9913 18.6271 23.1098 18.4668L23.2133 18.3267C23.5568 17.8619 23.7177 17.2871 23.6654 16.7116L23.5419 15.3533L20.1748 18.7204L23.3078 21.848Z" fill="#422520"></path>
                        <path d="M15.3534 0C13.445 0 11.5723 0.355849 9.82471 1.03053H20.8822C19.1346 0.355849 17.2618 0 15.3534 0Z" fill="#FFC212"></path>
                        <path d="M24.7422 8.18152H28.9275C29.1045 8.51669 29.2689 8.85811 29.4205 9.20505H24.509C24.6241 8.87894 24.7033 8.53626 24.7422 8.18152ZM15.5858 8.18152H1.77917C1.60216 8.51669 1.43775 8.85811 1.28613 9.20505H15.819C15.704 8.87894 15.6247 8.53626 15.5858 8.18152Z" fill="#F46520"></path>
                        <path d="M29.8251 10.2286H23.9965C23.1699 11.466 21.7606 12.2826 20.164 12.2826C18.5674 12.2826 17.1582 11.466 16.3315 10.2286H0.881565C0.30389 11.8595 0 13.5911 0 15.3533C0 17.0384 0.278201 18.6953 0.807522 20.2632L6.44113 14.6295L7.16489 13.9058L11.2563 17.9972L14.6301 14.629L15.3533 13.907L16.0765 14.629L19.4503 17.9972L23.5417 13.9058L29.899 20.2631C30.4284 18.6953 30.7066 17.0384 30.7066 15.3532C30.7066 13.5911 30.4027 11.8595 29.8251 10.2286Z" fill="#F14E23"></path>
                        <path d="M23.0221 2.05405H7.68418C7.15515 2.35904 6.64335 2.69583 6.15186 3.06367H24.5543C24.0629 2.69583 23.5511 2.35904 23.0221 2.05405Z" fill="#FCAB15"></path>
                        <path d="M24.504 6.13437H27.6294C27.8789 6.46667 28.115 6.80787 28.3359 7.1579H24.7405C24.7006 6.80309 24.6202 6.46034 24.504 6.13437ZM15.8238 6.13437H3.07708C2.82758 6.46667 2.59147 6.80787 2.37061 7.1579H15.5874C15.6273 6.80309 15.7077 6.46034 15.8238 6.13437Z" fill="#F77C1C"></path>
                        <path d="M23.0469 4.08728H25.7824C25.927 4.22116 26.0699 4.35709 26.2098 4.49693C26.4094 4.6966 26.6023 4.90165 26.7897 5.11089H23.9874C23.727 4.72405 23.4093 4.37888 23.0469 4.08728ZM17.2812 4.08728H4.92433C4.77971 4.22116 4.63679 4.35709 4.49695 4.49693C4.29735 4.6966 4.10437 4.90165 3.91699 5.11089H16.3408C16.6012 4.72405 16.9188 4.37888 17.2812 4.08728Z" fill="#F99419"></path>
                        <path d="M20.164 11.2591C22.1425 11.2591 23.7464 9.65522 23.7464 7.67671C23.7464 5.6982 22.1425 4.0943 20.164 4.0943C18.1854 4.0943 16.5815 5.6982 16.5815 7.67671C16.5815 9.65522 18.1854 11.2591 20.164 11.2591Z" fill="#FFC212"></path>
                        <path d="M19.7817 38.996H10.9247C13.7163 40.3346 16.9902 40.3346 19.7817 38.996Z" fill="#422520"></path>
                        <path d="M5.17781 28.7744C5.14433 29.11 5.12717 29.4471 5.12695 29.7841H9.80554C9.814 29.4412 9.85397 29.1036 9.92345 28.7744H5.17781Z" fill="#422520"></path>
                        <path d="M17.776 34.9018C17.0305 35.263 16.2068 35.4539 15.3532 35.4539C14.4997 35.4539 13.676 35.2629 12.9304 34.9018H6.49816C6.70195 35.2532 6.92856 35.5951 7.17784 35.9253H23.5286C23.7779 35.595 24.0045 35.2532 24.2083 34.9018H17.776Z" fill="#422520"></path>
                        <path d="M8.06198 36.9489C8.08215 36.9693 8.10173 36.9901 8.12211 37.0104C8.47465 37.3624 8.84684 37.6826 9.23463 37.9724H21.4718C21.8596 37.6826 22.2318 37.3624 22.5844 37.0104C22.6048 36.9901 22.6243 36.9693 22.6445 36.9489H8.06198Z" fill="#422520"></path>
                        <path d="M10.247 27.7508C10.5211 27.1109 10.9179 26.5226 11.4259 26.0155L15.3532 22.0948L19.2805 26.0155C19.7885 26.5226 20.1853 27.111 20.4594 27.7508H25.3737C24.9878 25.8532 24.0585 24.044 22.5844 22.5724L15.3532 15.3533L8.12211 22.5724C6.64801 24.044 5.71868 25.8533 5.3328 27.7508H10.247Z" fill="#422520"></path>
                        <path d="M20.7831 28.7744C20.8525 29.1036 20.8925 29.4412 20.9009 29.7841H25.5795C25.5793 29.4471 25.5621 29.11 25.5286 28.7744H20.7831Z" fill="#422520"></path>
                        <path d="M10.1418 31.8311C10.0203 31.5008 9.93065 31.1584 9.87442 30.8076H5.17773C5.21188 31.1506 5.26377 31.4923 5.33258 31.8311H10.1418Z" fill="#422520"></path>
                        <path d="M20.0611 32.8547C19.8411 33.2041 19.5802 33.5316 19.2805 33.8307C19.2644 33.8467 19.248 33.8624 19.2317 33.8782H24.7273C24.8739 33.5427 25.0011 33.2009 25.1099 32.8547H20.0611Z" fill="#422520"></path>
                        <path d="M20.8321 30.8076C20.7758 31.1584 20.6862 31.5009 20.5647 31.8311H25.3739C25.4428 31.4923 25.4946 31.1506 25.5288 30.8076H20.8321Z" fill="#422520"></path>
                        <path d="M11.4747 33.8783C11.4584 33.8625 11.442 33.8468 11.4259 33.8307C11.1263 33.5316 10.8654 33.2042 10.6454 32.8547H5.5965C5.70528 33.2011 5.83254 33.5428 5.97914 33.8783H11.4747Z" fill="#422520"></path>
                    </svg>
                    <h2 className='form-title'>{language === 'tamil' ? 'படிவம்' : 'Form'}</h2></div>

                <div className="progress mb-4">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }} aria-valuenow={progress}>
                        {/* {progress}% */}
                    </div>
                </div>
                {[
                    { name: 'name', label: lang.name, icon: <FaUser /> },
                    { name: 'phone', label: lang.phone, icon: <FaPhone /> },
                    { name: 'address', label: lang.address, icon: <FaAddressCard />, type: 'textarea' },
                    { name: 'aadhar', label: lang.aadhar, icon: <FaIdCard /> }
                ].map(({ name, label, icon, type = 'text' }) => (
                    <div className="mb-3" key={name}>
                        {/* <label className="form-label">{icon} {label}</label> */}
                        {type === 'textarea' ? (
                            <textarea
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="form-input"
                                // className="form-control"
                                placeholder={label}
                            />
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="form-input"
                                placeholder={label}
                            />
                        )}
                        {errors[name] && <div className="text-danger">{errors[name]}</div>}
                    </div>
                ))}
                <button type="submit" className="form-button w-100">{lang.submit}</button>
            </form>
        </div>
    );
};

export default Form;
