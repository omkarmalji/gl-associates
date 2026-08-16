import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "@phosphor-icons/react";

type Fields = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
};

const initialFields: Fields = { name: "", email: "", phone: "", projectType: "", location: "", budget: "", message: "" };

export function ContactPage() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (next: Fields) => {
    const nextErrors: Partial<Fields> = {};
    if (!next.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(next.email)) nextErrors.email = "Enter a valid email address.";
    if (!next.projectType) nextErrors.projectType = "Choose a project type.";
    if (!next.location.trim()) nextErrors.location = "Enter the project location.";
    if (!next.budget) nextErrors.budget = "Choose an indicative budget range.";
    if (next.message.trim().length < 20) nextErrors.message = "Please share at least 20 characters about the project.";
    return nextErrors;
  };

  const update = (key: keyof Fields, value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (errors[key]) setErrors({ ...errors, [key]: validate(next)[key] });
  };

  const blur = (key: keyof Fields) => setErrors({ ...errors, [key]: validate(fields)[key] });

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
    const body = encodeURIComponent([
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone || "Not provided"}`,
      `Project type: ${fields.projectType}`,
      `Location: ${fields.location}`,
      `Budget: ${fields.budget}`,
      "",
      fields.message,
    ].join("\n"));
    setSubmitted(true);
    window.location.href = `mailto:projects@gl-associates.net?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="contact-hero page-pad">
        <div data-reveal><p>Contact</p><h1>Tell us what you are planning.</h1></div>
        <div className="contact-hero__details" data-reveal>
          <p>Flat no. 202, 555 Narayan Chambers<br />Opp. Narayan Peth Police Chowki<br />Pune 411030</p>
          <a href="tel:+917507353159">+91 75073 53159</a>
          <a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a>
        </div>
      </section>

      <section className="contact-form-section page-pad">
        <div className="contact-form-section__visual" data-image-reveal><img src="images/original/home-09.jpg" alt="Residential architecture proposal in a landscaped setting" /></div>
        <form className="contact-form" onSubmit={submit} noValidate data-reveal>
          <div className="form-intro"><h2>Project inquiry</h2><p>Share what you know today. We can shape the rest together.</p></div>
          <Field label="Your name" name="name" value={fields.name} error={errors.name} onChange={(value) => update("name", value)} onBlur={() => blur("name")} autoComplete="name" />
          <Field label="Email address" name="email" type="email" value={fields.email} error={errors.email} onChange={(value) => update("email", value)} onBlur={() => blur("email")} autoComplete="email" />
          <Field label="Phone" optional name="phone" type="tel" value={fields.phone} onChange={(value) => update("phone", value)} autoComplete="tel" />
          <div className="form-field">
            <label htmlFor="project-type">Project type</label>
            <select id="project-type" name="projectType" value={fields.projectType} onChange={(e) => update("projectType", e.target.value)} onBlur={() => blur("projectType")} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "project-type-error" : undefined}>
              <option value="">Select one</option><option>Architecture</option><option>Interior</option><option>Conservation</option><option>Collaboration</option><option>Other</option>
            </select>
            {errors.projectType && <span id="project-type-error" className="field-error" role="alert">{errors.projectType}</span>}
          </div>
          <Field label="Project location" name="location" value={fields.location} error={errors.location} onChange={(value) => update("location", value)} onBlur={() => blur("location")} autoComplete="address-level2" />
          <div className="form-field">
            <label htmlFor="budget">Indicative budget</label>
            <select id="budget" name="budget" value={fields.budget} onChange={(e) => update("budget", e.target.value)} onBlur={() => blur("budget")} aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "budget-error" : undefined}>
              <option value="">Select a range</option><option>Below ₹50 lakh</option><option>₹50 lakh - ₹1 crore</option><option>₹1 crore - ₹3 crore</option><option>Above ₹3 crore</option><option>To be discussed</option>
            </select>
            {errors.budget && <span id="budget-error" className="field-error" role="alert">{errors.budget}</span>}
          </div>
          <div className="form-field form-field--wide">
            <label htmlFor="message">Tell us about the project</label>
            <textarea id="message" name="message" rows={6} value={fields.message} onChange={(e) => update("message", e.target.value)} onBlur={() => blur("message")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
            {errors.message && <span id="message-error" className="field-error" role="alert">{errors.message}</span>}
          </div>
          <button type="submit">Prepare email <ArrowUpRight size={17} weight="light" /></button>
          {submitted && <p className="form-success" role="status"><Check size={18} /> Your email app is opening with the inquiry filled in.</p>}
        </form>
      </section>
    </>
  );
}

type FieldProps = {
  label: string;
  name: keyof Fields;
  value: string;
  error?: string;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

function Field({ label, name, value, error, optional, type = "text", autoComplete, onChange, onBlur }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}{optional && <span>Optional</span>}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
      {error && <span id={errorId} className="field-error" role="alert">{error}</span>}
    </div>
  );
}
