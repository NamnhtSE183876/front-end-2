import React, { useEffect } from 'react';

const DepositSuccess = () => {
  useEffect(() => {
    // Sau 3 giây, đóng tab hiện tại và gửi thông báo
    const timer = setTimeout(() => {
      // Gửi thông báo đến tab khác để cập nhật trang
      window.opener.postMessage('payment_successful', '*');
      // Đóng tab hiện tại (chỉ hoạt động nếu tab được mở từ window.open())
      window.close();
    }, 3000);

    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, []);

  return (
    <div className="success-container">
      <h1>Deposit Successful!</h1>
      <p>Thank you for your deposit. You will be redirected shortly...</p>
    </div>
  );
};

export default DepositSuccess;
