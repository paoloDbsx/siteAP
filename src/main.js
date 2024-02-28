const activitiesLinkList = () => {
  clear("#activities-link-list");
  data.activities.forEach((activity) => {
    const activityLink = one("#activity-link-template").content.querySelector(
      "li"
    );
    one("a", activityLink).href = "/" + activity.slug;
    one("span", activityLink).textContent = activity.name;
    const activityImg = one("img", activityLink);
    activityImg.src = activity.icon;
    activityImg.alt = activity.icon_alt;
    clone("#activities-link-list", "#activity-link-template");
  });
};

const hiringJobList = () => {
  clear("#hiring-job-list");
  data.jobs.forEach((job) => {
    one("#hiring-job-template").content.querySelector("li").textContent =
      job.name;
    clone("#hiring-job-list", "#hiring-job-template");
  });
};

const footerLinkList = () => {
  clear("#footer-link-list");
  data.activities.forEach((activity) => {
    const footerLink = one("#footer-link-template")
      .content.querySelector("li")
      .querySelector("a");
    footerLink.textContent = activity.name;
    footerLink.href = "/" + activity.slug;
    clone("#footer-link-list", "#footer-link-template");
  });
};

const asideLinkList = () => {
  clear("#aside-link-list");
  data.activities.forEach((activity) => {
    const asideLink = one("#footer-link-template")
      .content.querySelector("li")
      .querySelector("a");
    asideLink.textContent = activity.name;
    asideLink.href = "/" + activity.slug;
    clone("#aside-link-list", "#footer-link-template");
  });
};

const setActivityData = (activity) => {
  one("#h1").textContent = activity.name;
  one("#objectives").textContent = activity.objectives;
  one("#before-list").textContent = activity.before_list;
  one("#after-list").textContent = activity.after_list;
  const img = one("#img");
  img.src = activity.img;
  img.img_alt = activity.img_alt;
  clear("#list");
  activity.list.forEach((element) => {
    one("#hiring-job-template").content.querySelector("li").textContent =
      element;
    clone("#list", "#hiring-job-template");
  });
};

footerLinkList();

const routes = [
  {
    path: "/",
    callback: () => {
      new Page({
        template: "#home-template",
        title: "Audit Process",
        metaDescription:
          "Audit Process est un bureau d'études spécialisé dans le domaine de l'hydraulique et des fluides.",
        after: () => {
          activitiesLinkList();
          hiringJobList();
          listenLink();
        },
      });
    },
  },
  {
    path: "/contactez-nous",
    callback: () => {
      new Page({
        template: "#contact-template",
        title: "Audit Process - Contact",
        metaDescription:
          "Contactez Audit Process pour toute candidature, demande d'intervention ou partenariat.",
        after: () => {
          listenLink();
          one("form").addEventListener("submit", (event) => {
            event.preventDefault();
            const mail = new Mail(new FormData(event.target));
            mail.send();
          });
        },
      });
    },
  },
];

data.activities.forEach((activity) => {
  routes.push({
    path: "/" + activity.slug,
    callback: () => {
      new Page({
        template: "#activity-template",
        title: "Audit Process - " + activity.name,
        metaDescription: activity.meta_description,
        after: () => {
          asideLinkList();
          setActivityData(activity);
          listenLink();
        },
      });
    },
  });
});

const router = new HashRouter(routes);

listenLink = () => {
  few("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = new URL(link.href);
      router.navigateTo(url.pathname);
    });
  });
};

window.addEventListener("load", () => {
  router.get(router.getCurrentPath());
});

window.addEventListener("hashchange", () => {
  router.get(router.getCurrentPath());
});

const navigateToHome = () => {
  router.navigateTo("/");
};

const setNavVisibility = (visibility) => {
  const navClassList = one("nav").classList;
  visibility
    ? navClassList.remove("translate-x-full")
    : navClassList.add("translate-x-full");
};
