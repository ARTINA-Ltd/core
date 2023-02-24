export const Show404Errors = (toast) => {
    toast.current.show({
      severity: "error",
      summary: " خطایی پیش آمده",
      detail: "کاربر با این مشخصات وجود ندارد   ",
      life: 3000,
    });
  };
  
  export const Show500Errors = (toast) => {
    toast.current.show({
      severity: "error",
      summary: " خطایی پیش آمده",
      detail: "لطفا دوباره امتحان کنید",
      life: 3000,
    });
  };
  
  export const ShowNetorkErrors = (toast) => {
    toast.current.show({
      severity: "error",
      summary: "   به اینترنت متصل نمیباشید",
      detail: "لطفا دوباره امتحان کنید",
      life: 3000,
    });
  };
  export const ShowEmptyState = (toast) => {
    toast.current.show({
      severity: "error",
      summary: "  اطلاعات ناقص میباشد",
      detail: "شهر و استان نباید خالی باشند   ",
      life: 3000,
    });
  };
  export const ShowTokenErrors = (toast) => {
    toast.current.show({
      severity: "error",
      summary: "   مدت زمان توکن به پایان رسیده    ",
      detail: " ابتدا از حساب خود خارج شده  و دوباره وارد شوید ",
      life: 3000,
    });
  };
  
  export const Show400Errors = (toast) => {
    toast.current.show({
      severity: "error",
      summary: " خطایی پیش آمده",
      detail: "خطایی در اطلاعات است.دوباره امتحان کنید",
      life: 3000,
    });
  };
  export const ShowSucessMsg = (toast) => {
    toast.current.show({
      severity: "success",
      summary: " کد200 ",
      detail: "درخواست با موفقیت انجام شد ",
    });
  };
  export default Show400Errors;
  