export class Teams {
  constructor(private image: string, private name: string, private github: string, private linkedin: string) {}
  getImage(): string {
    return this.image;
  }

  getName(): string {
    return this.name;
  }

  getGithub(): string {
    return this.github;
  }
  getLinkedin(): string {
    return this.linkedin;
  }
}
