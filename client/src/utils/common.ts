import colors from "@/theme/colors";

const commonUtils = {
  sleep: (seconds: number) => {
    return new Promise((r) => setTimeout(r, seconds * 1000));
  },
  calcPercentage: (actual: number, total: number) => {
    const percent = (100 * actual) / total;

    return isNaN(percent) ? 0 : Math.floor(percent);
  },
  shuffleArray: <T>(array: T[]) => {
    const newArray = [...array];

    const arrayLength = newArray.length;

    for (let i = arrayLength - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [newArray[i], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[i],
      ];
    }

    return newArray;
  },
  generateRandomId: (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },
  formatNumberWithCommas: (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  formatNumber: (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed() + "K";
    }

    return num.toString();
  },
  randomNumberBetween: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  isRTL: (language: string) => {
    return language === "he";
  },
  urlToFile: async (url: string, fileName: string): Promise<File | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Error converting URL to File:", error);
      return null;
    }
  },
  generateAvatarColor: (id: string) => {
    const hash = id.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors.avatar[Math.abs(hash) % colors.avatar.length];
  },
};

export default commonUtils;
