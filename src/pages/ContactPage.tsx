import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "@phosphor-icons/react";

type Fields = { name: string; email: string; phone: string; projectType: string; message: string };
const initialFields: Fields = { name: "", email: "", phone: "", projectType: "", message: "" };

export function ContactPage() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (next: Fields) => {
    const nextErrors: Partial<Fields> = {};
    if (!next.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(next.email)) nextErrors.email = "Enter a valid email address.";
    if (!next.projectType) nextErrors.projectType = "Choose a project type.";
    if (next.message.trim().length < 20) nextErrors.message = "Tell us a little more, at least 20 characters.";
    return nextErrors;
  };

  const update = (key: keyof Fields, value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (errors[key]) setErrors({ ...errors, [key]: validate(next)[key] });
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      window.setTimeout(() => document.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus(), 0);
      return;
    }
    const subject = encodeURIComponent(`${fields.projectType} inquiry from ${fields.name}`);
    const body = encodeURIComponent(`Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone || "Not provided"}\nProject type: ${fields.projectType}\n\n${fields.message}`);
    setSubmitted(true);
    window.location.href = `mailto:projects@gl-associates.net?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="contact-hero page-pad">
        <div><p data-reveal>Contact</p><h1><span data-line-reveal>Start a</span><br /><span data-line-reveal className="display-italic">conversation.</span></h1></div>
        <div className="contact-hero__details" data-reveal>
          <p>Flat no. 202, 555 Narayan Chambers<br />Opp. Narayan Peth Police Chowki<br />Pune 411030</p>
          <a href="tel:+917507353159">+91 75073 53159</a>
          <a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a>
        </div>
      </section>
      <section className="contact-form-section page-pad">
        <div className="contact-form-section__visual" data-reveal data-parallax><img src="images/original/home-09.jpg" alt="Spirit of the Place exterior proposal" /></div>
        <form className="contact-form" onSubmit={submit} noValidate data-reveal>
          <div className="form-field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" autoComplete="name" value={fields.name} onChange={(e) => update("name", e.target.value)} onBlur={() => setErrors({ ...errors, name: validate(fields).name })} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && <span id="name-error" className="field-error" role="alert">{errors.name}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={(e) => update("email", e.target.value)} onBlur={() => setErrors({ ...errors, email: validate(fields).email })} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email && <span id="email-error" className="field-error" role="alert">{errors.email}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone <span>Optional</span></label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="project-type">Project type</label>
            <select id="project-type" name="projectType" value={fields.projectType} onChange={(e) => update("projectType", e.target.value)} onBlur={() => setErrors({ ...errors, projectType: validate(fields).projectType })} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "project-type-error" : undefined}>
              <option value="">Select one</option><option>Architecture</option><option>Interior</option><option>Conservation</option><option>Collaboration</option><option>Other</option>
            </select>
            {errors.projectType && <span id="project-type-error" className="field-error" role="alert">{errors.projectType}</span>}
          </div>
          <div className="form-field form-field--wide">
            <label htmlFor="message">Tell us about the project</label>
            <textarea id="message" name="message" rows={5} value={fields.message} onChange={(e) => update("message", e.target.value)} onBlur={() => setErrors({ ...errors, message: validate(fields).message })} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
            {errors.message && <span id="message-error" className="field-error" role="alert">{errors.message}</span>}
          </div>
          <button type="submit">Prepare email <ArrowUpRight size={17} /></button>
          {submitted && <p className="form-success" role="status"><Check size={18} /> Your email app is opening with the inquiry filled in.</p>}
        </form>
      </section>
    </>
  );
}
