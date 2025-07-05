export function saveNaverParams() {
  const params = new URLSearchParams(window.location.search);
  const keys = ["n_keyword", "n_rank", "n_ad", "n_ad_group", "n_campaign"];

  keys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
    }
  });
}
