"use client";

import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { storage } from "@/lib/firebase/client";
import { useAdminAuth } from "@/components/dashboard/useAdminAuth";
import { homeContent } from "@/lib/content/homeContent";
import type { HomeContent, MediaRef } from "@/lib/content/types";

function MediaPreview({ media }: { media: MediaRef }) {
  if (media.downloadURL.endsWith(".mp4")) {
    return (
      <video
        src={media.downloadURL}
        className="h-32 w-full rounded-xl border border-white/10 object-cover"
        muted
        playsInline
        loop
      />
    );
  }

  return (
    <img
      src={media.downloadURL}
      alt={media.alt || ""}
      className="h-32 w-full rounded-xl border border-white/10 object-cover"
    />
  );
}

async function uploadMedia(file: File, storagePath: string) {
  if (!storage) throw new Error("Storage unavailable");
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export default function HomeContentEditor() {
  const { user, loading, isAdmin, token, login, logout } = useAdminAuth();
  const [content, setContent] = useState<HomeContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!token || !isAdmin) return;

    fetch("/api/content/home", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setContent((data?.content as HomeContent) || homeContent);
      })
      .catch(() => setContent(homeContent));
  }, [token, isAdmin]);

  const handleSave = async () => {
    if (!token || !content) return;
    setSaving(true);
    setError(null);

    const response = await fetch("/api/content/home", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });

    setSaving(false);
    if (!response.ok) {
      setError("Failed to save content");
    }
  };

  const updateContent = (next: HomeContent) => setContent(next);

  const handleMediaUpload = async (
    media: MediaRef,
    file: File,
    onUpdate: (updated: MediaRef) => void
  ) => {
    const storagePath = media.storagePath || `content/home/uploads/${Date.now()}-${file.name}`;
    const downloadURL = await uploadMedia(file, storagePath);
    onUpdate({ ...media, storagePath, downloadURL });
  };

  if (loading) {
    return <div className="min-h-screen bg-[#050816] text-white p-10">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050816] text-white p-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold">Home content editor</h1>
          <p className="mt-2 text-sm text-white/70">
            Sign in with an admin account to edit the Home page.
          </p>
          <Button onClick={login} className="mt-6 rounded-2xl bg-[#5ef2ff] text-[#050914]">
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050816] text-white p-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold">Access denied</h1>
          <p className="mt-2 text-sm text-white/70">
            Your account is not authorized for this editor.
          </p>
          <Button onClick={logout} className="mt-6 rounded-2xl bg-white/10 text-white">
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  if (!content) {
    return <div className="min-h-screen bg-[#050816] text-white p-10">Loading content...</div>;
  }

  const ogImage = content.seo.ogImage;

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Edit Home Content</h1>
            <p className="text-sm text-white/60">Signed in as {user.email}</p>
          </div>
          <div className="relative flex items-center gap-3">
            <div className="hidden flex-wrap items-center gap-3 md:flex">
              <Button onClick={() => (window.location.href = "/dashboard")} className="rounded-2xl bg-white/10 text-white">
                Dashboard
              </Button>
              <Button onClick={logout} className="rounded-2xl bg-white/10 text-white">
                Sign out
              </Button>
              <Button onClick={handleSave} className="rounded-2xl bg-[#5ef2ff] text-[#050914]">
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            {menuOpen ? (
              <div className="absolute right-0 top-12 z-20 w-52 rounded-2xl border border-white/10 bg-[#0c1021] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] md:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "/dashboard";
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    handleSave();
                  }}
                  className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

        <Separator className="my-8 bg-white/10" />

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">SEO</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.seo.title}
            onChange={(event) =>
              updateContent({
                ...content,
                seo: { ...content.seo, title: event.target.value },
              })
            }
            placeholder="SEO title"
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.seo.description}
            onChange={(event) =>
              updateContent({
                ...content,
                seo: { ...content.seo, description: event.target.value },
              })
            }
            placeholder="SEO description"
          />
          {ogImage ? (
            <div className="space-y-3">
              <p className="text-xs uppercase text-white/60">OG Image</p>
              <MediaPreview media={ogImage} />
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={ogImage.alt || ""}
                onChange={(event) =>
                  updateContent({
                    ...content,
                    seo: {
                      ...content.seo,
                      ogImage: { ...ogImage, alt: event.target.value },
                    },
                  })
                }
                placeholder="Alt text"
              />
              <input
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  await handleMediaUpload(ogImage, file, (media) =>
                    updateContent({ ...content, seo: { ...content.seo, ogImage: media } })
                  );
                }}
              />
            </div>
          ) : null}
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Hero</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.hero.title}
            onChange={(event) =>
              updateContent({
                ...content,
                hero: { ...content.hero, title: event.target.value },
              })
            }
            placeholder="Hero title"
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.hero.subtitle}
            onChange={(event) =>
              updateContent({
                ...content,
                hero: { ...content.hero, subtitle: event.target.value },
              })
            }
            placeholder="Hero subtitle"
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.hero.trustLabel}
            onChange={(event) =>
              updateContent({
                ...content,
                hero: { ...content.hero, trustLabel: event.target.value },
              })
            }
            placeholder="Trust label"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs uppercase text-white/60">Primary CTA</p>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={content.hero.primaryCta.text}
                onChange={(event) =>
                  updateContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      primaryCta: {
                        ...content.hero.primaryCta,
                        text: event.target.value,
                      },
                    },
                  })
                }
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={content.hero.primaryCta.href || ""}
                onChange={(event) =>
                  updateContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      primaryCta: {
                        ...content.hero.primaryCta,
                        href: event.target.value,
                      },
                    },
                  })
                }
                placeholder="Primary CTA href"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase text-white/60">Secondary CTA</p>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={content.hero.secondaryCta.text}
                onChange={(event) =>
                  updateContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      secondaryCta: {
                        ...content.hero.secondaryCta,
                        text: event.target.value,
                      },
                    },
                  })
                }
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={content.hero.secondaryCta.href || ""}
                onChange={(event) =>
                  updateContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      secondaryCta: {
                        ...content.hero.secondaryCta,
                        href: event.target.value,
                      },
                    },
                  })
                }
                placeholder="Secondary CTA href"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase text-white/60">Hero Background Video</p>
            <MediaPreview media={content.hero.backgroundVideo} />
            <input
              type="file"
              accept="video/mp4"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                await handleMediaUpload(content.hero.backgroundVideo, file, (media) =>
                  updateContent({
                    ...content,
                    hero: { ...content.hero, backgroundVideo: media },
                  })
                );
              }}
            />
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase text-white/60">Company Logos</p>
            <div className="grid gap-4 md:grid-cols-2">
              {content.hero.logos.map((logo, index) => (
                <div key={logo.storagePath} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <MediaPreview media={logo} />
                  <input
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={logo.alt || ""}
                    onChange={(event) => {
                      const logos = [...content.hero.logos];
                      logos[index] = { ...logo, alt: event.target.value };
                      updateContent({ ...content, hero: { ...content.hero, logos } });
                    }}
                    placeholder="Alt text"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      await handleMediaUpload(logo, file, (media) => {
                        const logos = [...content.hero.logos];
                        logos[index] = { ...logo, ...media };
                        updateContent({ ...content, hero: { ...content.hero, logos } });
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Capabilities</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.capabilities.eyebrow}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  capabilities: {
                    ...content.sections.capabilities,
                    eyebrow: event.target.value,
                  },
                },
              })
            }
            placeholder="Eyebrow"
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.capabilities.title}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  capabilities: {
                    ...content.sections.capabilities,
                    title: event.target.value,
                  },
                },
              })
            }
            placeholder="Title"
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.capabilities.subtitle}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  capabilities: {
                    ...content.sections.capabilities,
                    subtitle: event.target.value,
                  },
                },
              })
            }
            placeholder="Subtitle"
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.capabilities.footerText}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  capabilities: {
                    ...content.sections.capabilities,
                    footerText: event.target.value,
                  },
                },
              })
            }
            placeholder="Footer text"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.capabilities.footerCta.text}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    capabilities: {
                      ...content.sections.capabilities,
                      footerCta: {
                        ...content.sections.capabilities.footerCta,
                        text: event.target.value,
                      },
                    },
                  },
                })
              }
              placeholder="Footer CTA text"
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.capabilities.footerCta.href || ""}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    capabilities: {
                      ...content.sections.capabilities,
                      footerCta: {
                        ...content.sections.capabilities.footerCta,
                        href: event.target.value,
                      },
                    },
                  },
                })
              }
              placeholder="Footer CTA href"
            />
          </div>

          <div className="space-y-4">
            {content.sections.capabilities.cards.map((card, index) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.title}
                    onChange={(event) => {
                      const cards = [...content.sections.capabilities.cards];
                      cards[index] = { ...card, title: event.target.value };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          capabilities: {
                            ...content.sections.capabilities,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="Title"
                  />
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.iconKey}
                    onChange={(event) => {
                      const cards = [...content.sections.capabilities.cards];
                      cards[index] = { ...card, iconKey: event.target.value };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          capabilities: {
                            ...content.sections.capabilities,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="Icon key"
                  />
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.tech}
                    onChange={(event) => {
                      const cards = [...content.sections.capabilities.cards];
                      cards[index] = { ...card, tech: event.target.value };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          capabilities: {
                            ...content.sections.capabilities,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="Tech"
                  />
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.ctaText}
                    onChange={(event) => {
                      const cards = [...content.sections.capabilities.cards];
                      cards[index] = { ...card, ctaText: event.target.value };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          capabilities: {
                            ...content.sections.capabilities,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="CTA text"
                  />
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.href}
                    onChange={(event) => {
                      const cards = [...content.sections.capabilities.cards];
                      cards[index] = { ...card, href: event.target.value };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          capabilities: {
                            ...content.sections.capabilities,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="CTA href"
                  />
                </div>
                <textarea
                  className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={card.description}
                  onChange={(event) => {
                    const cards = [...content.sections.capabilities.cards];
                    cards[index] = { ...card, description: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        capabilities: {
                          ...content.sections.capabilities,
                          cards,
                        },
                      },
                    });
                  }}
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Process</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.process.title}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  process: { ...content.sections.process, title: event.target.value },
                },
              })
            }
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.process.subtitle}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  process: { ...content.sections.process, subtitle: event.target.value },
                },
              })
            }
          />
          {content.sections.process.items.map((item, index) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={item.number}
                  onChange={(event) => {
                    const items = [...content.sections.process.items];
                    items[index] = { ...item, number: event.target.value };
                    updateContent({
                      ...content,
                      sections: { ...content.sections, process: { ...content.sections.process, items } },
                    });
                  }}
                  placeholder="Step number"
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={item.title}
                  onChange={(event) => {
                    const items = [...content.sections.process.items];
                    items[index] = { ...item, title: event.target.value };
                    updateContent({
                      ...content,
                      sections: { ...content.sections, process: { ...content.sections.process, items } },
                    });
                  }}
                  placeholder="Step title"
                />
              </div>
              <textarea
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={item.description}
                onChange={(event) => {
                  const items = [...content.sections.process.items];
                  items[index] = { ...item, description: event.target.value };
                  updateContent({
                    ...content,
                    sections: { ...content.sections, process: { ...content.sections.process, items } },
                  });
                }}
                placeholder="Step description"
              />
              <div className="mt-3 space-y-2">
                <p className="text-xs uppercase text-white/60">Panel</p>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={item.panel.eyebrow}
                  onChange={(event) => {
                    const items = [...content.sections.process.items];
                    items[index] = {
                      ...item,
                      panel: { ...item.panel, eyebrow: event.target.value },
                    };
                    updateContent({
                      ...content,
                      sections: { ...content.sections, process: { ...content.sections.process, items } },
                    });
                  }}
                  placeholder="Panel eyebrow"
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={item.panel.heading}
                  onChange={(event) => {
                    const items = [...content.sections.process.items];
                    items[index] = {
                      ...item,
                      panel: { ...item.panel, heading: event.target.value },
                    };
                    updateContent({
                      ...content,
                      sections: { ...content.sections, process: { ...content.sections.process, items } },
                    });
                  }}
                  placeholder="Panel heading"
                />
                <textarea
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={item.panel.body}
                  onChange={(event) => {
                    const items = [...content.sections.process.items];
                    items[index] = {
                      ...item,
                      panel: { ...item.panel, body: event.target.value },
                    };
                    updateContent({
                      ...content,
                      sections: { ...content.sections, process: { ...content.sections.process, items } },
                    });
                  }}
                  placeholder="Panel body"
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={item.panel.primaryCta.text}
                    onChange={(event) => {
                      const items = [...content.sections.process.items];
                      items[index] = {
                        ...item,
                        panel: {
                          ...item.panel,
                          primaryCta: { ...item.panel.primaryCta, text: event.target.value },
                        },
                      };
                      updateContent({
                        ...content,
                        sections: { ...content.sections, process: { ...content.sections.process, items } },
                      });
                    }}
                    placeholder="Primary CTA text"
                  />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={item.panel.primaryCta.href || ""}
                    onChange={(event) => {
                      const items = [...content.sections.process.items];
                      items[index] = {
                        ...item,
                        panel: {
                          ...item.panel,
                          primaryCta: { ...item.panel.primaryCta, href: event.target.value },
                        },
                      };
                      updateContent({
                        ...content,
                        sections: { ...content.sections, process: { ...content.sections.process, items } },
                      });
                    }}
                    placeholder="Primary CTA href"
                  />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={item.panel.secondaryCta.text}
                    onChange={(event) => {
                      const items = [...content.sections.process.items];
                      items[index] = {
                        ...item,
                        panel: {
                          ...item.panel,
                          secondaryCta: { ...item.panel.secondaryCta, text: event.target.value },
                        },
                      };
                      updateContent({
                        ...content,
                        sections: { ...content.sections, process: { ...content.sections.process, items } },
                      });
                    }}
                    placeholder="Secondary CTA text"
                  />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={item.panel.secondaryCta.href || ""}
                    onChange={(event) => {
                      const items = [...content.sections.process.items];
                      items[index] = {
                        ...item,
                        panel: {
                          ...item.panel,
                          secondaryCta: { ...item.panel.secondaryCta, href: event.target.value },
                        },
                      };
                      updateContent({
                        ...content,
                        sections: { ...content.sections, process: { ...content.sections.process, items } },
                      });
                    }}
                    placeholder="Secondary CTA href"
                  />
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <p className="text-xs uppercase text-white/60">Panel Video</p>
                <MediaPreview media={item.video} />
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    await handleMediaUpload(item.video, file, (media) => {
                      const items = [...content.sections.process.items];
                      items[index] = { ...item, video: media };
                      updateContent({
                        ...content,
                        sections: { ...content.sections, process: { ...content.sections.process, items } },
                      });
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.techStack.eyebrow}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  techStack: { ...content.sections.techStack, eyebrow: event.target.value },
                },
              })
            }
            placeholder="Eyebrow"
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.techStack.title}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  techStack: { ...content.sections.techStack, title: event.target.value },
                },
              })
            }
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.techStack.subtitle}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  techStack: { ...content.sections.techStack, subtitle: event.target.value },
                },
              })
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            {content.sections.techStack.techs.map((tech, index) => (
              <div key={tech.label} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={tech.abbr}
                  onChange={(event) => {
                    const techs = [...content.sections.techStack.techs];
                    techs[index] = { ...tech, abbr: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        techStack: { ...content.sections.techStack, techs },
                      },
                    });
                  }}
                  placeholder="Abbr"
                />
                <input
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={tech.label}
                  onChange={(event) => {
                    const techs = [...content.sections.techStack.techs];
                    techs[index] = { ...tech, label: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        techStack: { ...content.sections.techStack, techs },
                      },
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.techStack.ctaText}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  techStack: { ...content.sections.techStack, ctaText: event.target.value },
                },
              })
            }
            placeholder="CTA text"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.techStack.ctaButton.text}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    techStack: {
                      ...content.sections.techStack,
                      ctaButton: { ...content.sections.techStack.ctaButton, text: event.target.value },
                    },
                  },
                })
              }
              placeholder="CTA button text"
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.techStack.ctaButton.href || ""}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    techStack: {
                      ...content.sections.techStack,
                      ctaButton: { ...content.sections.techStack.ctaButton, href: event.target.value },
                    },
                  },
                })
              }
              placeholder="CTA button href"
            />
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Footer</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.footer.brandName}
            onChange={(event) =>
              updateContent({
                ...content,
                footer: { ...content.footer, brandName: event.target.value },
              })
            }
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.footer.description}
            onChange={(event) =>
              updateContent({
                ...content,
                footer: { ...content.footer, description: event.target.value },
              })
            }
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.footer.nav.title}
            onChange={(event) =>
              updateContent({
                ...content,
                footer: { ...content.footer, nav: { ...content.footer.nav, title: event.target.value } },
              })
            }
            placeholder="Nav title"
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.footer.social.title}
            onChange={(event) =>
              updateContent({
                ...content,
                footer: {
                  ...content.footer,
                  social: { ...content.footer.social, title: event.target.value },
                },
              })
            }
            placeholder="Social title"
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.footer.legal.copyright}
            onChange={(event) =>
              updateContent({
                ...content,
                footer: {
                  ...content.footer,
                  legal: { ...content.footer.legal, copyright: event.target.value },
                },
              })
            }
            placeholder="Copyright"
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.footer.legal.tagline}
            onChange={(event) =>
              updateContent({
                ...content,
                footer: {
                  ...content.footer,
                  legal: { ...content.footer.legal, tagline: event.target.value },
                },
              })
            }
            placeholder="Tagline"
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.footer.legal.builtWith}
            onChange={(event) =>
              updateContent({
                ...content,
                footer: {
                  ...content.footer,
                  legal: { ...content.footer.legal, builtWith: event.target.value },
                },
              })
            }
            placeholder="Built with"
          />
          <div className="space-y-2">
            {content.footer.nav.links.map((link, index) => (
              <div key={link.label} className="grid gap-2 md:grid-cols-2">
                <input
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={link.label}
                  onChange={(event) => {
                    const links = [...content.footer.nav.links];
                    links[index] = { ...link, label: event.target.value };
                    updateContent({
                      ...content,
                      footer: { ...content.footer, nav: { ...content.footer.nav, links } },
                    });
                  }}
                />
                <input
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={link.href}
                  onChange={(event) => {
                    const links = [...content.footer.nav.links];
                    links[index] = { ...link, href: event.target.value };
                    updateContent({
                      ...content,
                      footer: { ...content.footer, nav: { ...content.footer.nav, links } },
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {content.footer.social.links.map((link, index) => (
              <div key={link.label} className="grid gap-2 md:grid-cols-3">
                <input
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={link.label}
                  onChange={(event) => {
                    const links = [...content.footer.social.links];
                    links[index] = { ...link, label: event.target.value };
                    updateContent({
                      ...content,
                      footer: { ...content.footer, social: { ...content.footer.social, links } },
                    });
                  }}
                  placeholder="Label"
                />
                <input
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={link.href}
                  onChange={(event) => {
                    const links = [...content.footer.social.links];
                    links[index] = { ...link, href: event.target.value };
                    updateContent({
                      ...content,
                      footer: { ...content.footer, social: { ...content.footer.social, links } },
                    });
                  }}
                  placeholder="Href"
                />
                <input
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={link.iconKey}
                  onChange={(event) => {
                    const links = [...content.footer.social.links];
                    links[index] = { ...link, iconKey: event.target.value };
                    updateContent({
                      ...content,
                      footer: { ...content.footer, social: { ...content.footer.social, links } },
                    });
                  }}
                  placeholder="Icon key"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Why LHWEB</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.why.eyebrow}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  why: { ...content.sections.why, eyebrow: event.target.value },
                },
              })
            }
            placeholder="Eyebrow"
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.why.title}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  why: { ...content.sections.why, title: event.target.value },
                },
              })
            }
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.why.subtitle}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  why: { ...content.sections.why, subtitle: event.target.value },
                },
              })
            }
          />
          <div className="space-y-3">
            {content.sections.why.features.map((feature, index) => (
              <div key={feature.title} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={feature.iconKey}
                  onChange={(event) => {
                    const features = [...content.sections.why.features];
                    features[index] = { ...feature, iconKey: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        why: { ...content.sections.why, features },
                      },
                    });
                  }}
                  placeholder="Icon key"
                />
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={feature.title}
                  onChange={(event) => {
                    const features = [...content.sections.why.features];
                    features[index] = { ...feature, title: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        why: { ...content.sections.why, features },
                      },
                    });
                  }}
                />
                <textarea
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={feature.description}
                  onChange={(event) => {
                    const features = [...content.sections.why.features];
                    features[index] = { ...feature, description: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        why: { ...content.sections.why, features },
                      },
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {content.sections.why.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={stat.value}
                  onChange={(event) => {
                    const stats = [...content.sections.why.stats];
                    stats[index] = { ...stat, value: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        why: { ...content.sections.why, stats },
                      },
                    });
                  }}
                  placeholder="Value"
                />
                <input
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={stat.label}
                  onChange={(event) => {
                    const stats = [...content.sections.why.stats];
                    stats[index] = { ...stat, label: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        why: { ...content.sections.why, stats },
                      },
                    });
                  }}
                  placeholder="Label"
                />
                <input
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={stat.sub || ""}
                  onChange={(event) => {
                    const stats = [...content.sections.why.stats];
                    stats[index] = { ...stat, sub: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        why: { ...content.sections.why, stats },
                      },
                    });
                  }}
                  placeholder="Sub label"
                />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase text-white/60">Why Image</p>
            <MediaPreview media={content.sections.why.image} />
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
              value={content.sections.why.image.alt || ""}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    why: {
                      ...content.sections.why,
                      image: { ...content.sections.why.image, alt: event.target.value },
                    },
                  },
                })
              }
              placeholder="Alt text"
            />
            <input
              type="file"
              accept="image/*"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                await handleMediaUpload(content.sections.why.image, file, (media) =>
                  updateContent({
                    ...content,
                    sections: {
                      ...content.sections,
                      why: { ...content.sections.why, image: media },
                    },
                  })
                );
              }}
            />
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Case Studies</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.caseStudies.eyebrow}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  caseStudies: {
                    ...content.sections.caseStudies,
                    eyebrow: event.target.value,
                  },
                },
              })
            }
            placeholder="Eyebrow"
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.caseStudies.title}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  caseStudies: {
                    ...content.sections.caseStudies,
                    title: event.target.value,
                  },
                },
              })
            }
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.caseStudies.subtitle}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  caseStudies: {
                    ...content.sections.caseStudies,
                    subtitle: event.target.value,
                  },
                },
              })
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.caseStudies.cta.text}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    caseStudies: {
                      ...content.sections.caseStudies,
                      cta: { ...content.sections.caseStudies.cta, text: event.target.value },
                    },
                  },
                })
              }
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.caseStudies.cta.href || ""}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    caseStudies: {
                      ...content.sections.caseStudies,
                      cta: { ...content.sections.caseStudies.cta, href: event.target.value },
                    },
                  },
                })
              }
              placeholder="CTA href"
            />
          </div>
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.caseStudies.closingText}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  caseStudies: {
                    ...content.sections.caseStudies,
                    closingText: event.target.value,
                  },
                },
              })
            }
            placeholder="Closing text"
          />
          <div className="grid gap-3 md:grid-cols-3">
            {content.sections.caseStudies.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={stat.label}
                  onChange={(event) => {
                    const stats = [...content.sections.caseStudies.stats];
                    stats[index] = { ...stat, label: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        caseStudies: { ...content.sections.caseStudies, stats },
                      },
                    });
                  }}
                  placeholder="Label"
                />
                <input
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  type="number"
                  value={stat.value}
                  onChange={(event) => {
                    const stats = [...content.sections.caseStudies.stats];
                    stats[index] = { ...stat, value: Number(event.target.value) };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        caseStudies: { ...content.sections.caseStudies, stats },
                      },
                    });
                  }}
                  placeholder="Value"
                />
                <input
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={stat.suffix}
                  onChange={(event) => {
                    const stats = [...content.sections.caseStudies.stats];
                    stats[index] = { ...stat, suffix: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        caseStudies: { ...content.sections.caseStudies, stats },
                      },
                    });
                  }}
                  placeholder="Suffix"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {content.sections.caseStudies.cards.map((card, index) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.title}
                    onChange={(event) => {
                      const cards = [...content.sections.caseStudies.cards];
                      cards[index] = { ...card, title: event.target.value };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          caseStudies: {
                            ...content.sections.caseStudies,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="Title"
                  />
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.metric}
                    onChange={(event) => {
                      const cards = [...content.sections.caseStudies.cards];
                      cards[index] = { ...card, metric: event.target.value };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          caseStudies: {
                            ...content.sections.caseStudies,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="Metric"
                  />
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.metricLabel}
                    onChange={(event) => {
                      const cards = [...content.sections.caseStudies.cards];
                      cards[index] = { ...card, metricLabel: event.target.value };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          caseStudies: {
                            ...content.sections.caseStudies,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="Metric label"
                  />
                </div>
                <textarea
                  className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={card.description}
                  onChange={(event) => {
                    const cards = [...content.sections.caseStudies.cards];
                    cards[index] = { ...card, description: event.target.value };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        caseStudies: {
                          ...content.sections.caseStudies,
                          cards,
                        },
                      },
                    });
                  }}
                  placeholder="Description"
                />
                <div className="mt-3 space-y-2">
                  <MediaPreview media={card.image} />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    value={card.image.alt || ""}
                    onChange={(event) => {
                      const cards = [...content.sections.caseStudies.cards];
                      cards[index] = {
                        ...card,
                        image: { ...card.image, alt: event.target.value },
                      };
                      updateContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          caseStudies: {
                            ...content.sections.caseStudies,
                            cards,
                          },
                        },
                      });
                    }}
                    placeholder="Image alt"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      await handleMediaUpload(card.image, file, (media) => {
                        const cards = [...content.sections.caseStudies.cards];
                        cards[index] = { ...card, image: media };
                        updateContent({
                          ...content,
                          sections: {
                            ...content.sections,
                            caseStudies: {
                              ...content.sections.caseStudies,
                              cards,
                            },
                          },
                        });
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Insights</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.insights.title}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  insights: { ...content.sections.insights, title: event.target.value },
                },
              })
            }
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.insights.subtitle}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  insights: { ...content.sections.insights, subtitle: event.target.value },
                },
              })
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.insights.cta.text}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    insights: {
                      ...content.sections.insights,
                      cta: { ...content.sections.insights.cta, text: event.target.value },
                    },
                  },
                })
              }
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.insights.cta.href || ""}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    insights: {
                      ...content.sections.insights,
                      cta: { ...content.sections.insights.cta, href: event.target.value },
                    },
                  },
                })
              }
              placeholder="CTA href"
            />
          </div>
          {content.sections.insights.posts.map((post, index) => (
            <div key={post.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={post.title}
                onChange={(event) => {
                  const posts = [...content.sections.insights.posts];
                  posts[index] = { ...post, title: event.target.value };
                  updateContent({
                    ...content,
                    sections: {
                      ...content.sections,
                      insights: { ...content.sections.insights, posts },
                    },
                  });
                }}
              />
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={post.category}
                onChange={(event) => {
                  const posts = [...content.sections.insights.posts];
                  posts[index] = { ...post, category: event.target.value };
                  updateContent({
                    ...content,
                    sections: {
                      ...content.sections,
                      insights: { ...content.sections.insights, posts },
                    },
                  });
                }}
              />
              <textarea
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={post.description}
                onChange={(event) => {
                  const posts = [...content.sections.insights.posts];
                  posts[index] = { ...post, description: event.target.value };
                  updateContent({
                    ...content,
                    sections: {
                      ...content.sections,
                      insights: { ...content.sections.insights, posts },
                    },
                  });
                }}
              />
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={post.href}
                onChange={(event) => {
                  const posts = [...content.sections.insights.posts];
                  posts[index] = { ...post, href: event.target.value };
                  updateContent({
                    ...content,
                    sections: {
                      ...content.sections,
                      insights: { ...content.sections.insights, posts },
                    },
                  });
                }}
              />
              <MediaPreview media={post.image} />
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                value={post.image.alt || ""}
                onChange={(event) => {
                  const posts = [...content.sections.insights.posts];
                  posts[index] = { ...post, image: { ...post.image, alt: event.target.value } };
                  updateContent({
                    ...content,
                    sections: {
                      ...content.sections,
                      insights: { ...content.sections.insights, posts },
                    },
                  });
                }}
                placeholder="Image alt"
              />
              <input
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  await handleMediaUpload(post.image, file, (media) => {
                    const posts = [...content.sections.insights.posts];
                    posts[index] = { ...post, image: media };
                    updateContent({
                      ...content,
                      sections: {
                        ...content.sections,
                        insights: { ...content.sections.insights, posts },
                      },
                    });
                  });
                }}
              />
            </div>
          ))}
        </section>

        <section className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Final CTA</h2>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.finalCta.eyebrow}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  finalCta: {
                    ...content.sections.finalCta,
                    eyebrow: event.target.value,
                  },
                },
              })
            }
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.finalCta.title}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  finalCta: {
                    ...content.sections.finalCta,
                    title: event.target.value,
                  },
                },
              })
            }
          />
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.finalCta.subtitle}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  finalCta: {
                    ...content.sections.finalCta,
                    subtitle: event.target.value,
                  },
                },
              })
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.finalCta.primaryCta.text}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    finalCta: {
                      ...content.sections.finalCta,
                      primaryCta: {
                        ...content.sections.finalCta.primaryCta,
                        text: event.target.value,
                      },
                    },
                  },
                })
              }
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.finalCta.primaryCta.href || ""}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    finalCta: {
                      ...content.sections.finalCta,
                      primaryCta: {
                        ...content.sections.finalCta.primaryCta,
                        href: event.target.value,
                      },
                    },
                  },
                })
              }
              placeholder="Primary CTA href"
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.finalCta.secondaryCta.text}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    finalCta: {
                      ...content.sections.finalCta,
                      secondaryCta: {
                        ...content.sections.finalCta.secondaryCta,
                        text: event.target.value,
                      },
                    },
                  },
                })
              }
            />
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              value={content.sections.finalCta.secondaryCta.href || ""}
              onChange={(event) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    finalCta: {
                      ...content.sections.finalCta,
                      secondaryCta: {
                        ...content.sections.finalCta.secondaryCta,
                        href: event.target.value,
                      },
                    },
                  },
                })
              }
              placeholder="Secondary CTA href"
            />
          </div>
          <textarea
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            value={content.sections.finalCta.trustText}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  finalCta: {
                    ...content.sections.finalCta,
                    trustText: event.target.value,
                  },
                },
              })
            }
          />
          <MediaPreview media={content.sections.finalCta.image} />
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
            value={content.sections.finalCta.image.alt || ""}
            onChange={(event) =>
              updateContent({
                ...content,
                sections: {
                  ...content.sections,
                  finalCta: {
                    ...content.sections.finalCta,
                    image: { ...content.sections.finalCta.image, alt: event.target.value },
                  },
                },
              })
            }
            placeholder="Image alt"
          />
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              await handleMediaUpload(content.sections.finalCta.image, file, (media) =>
                updateContent({
                  ...content,
                  sections: {
                    ...content.sections,
                    finalCta: { ...content.sections.finalCta, image: media },
                  },
                })
              );
            }}
          />
        </section>
      </div>
    </div>
  );
}
