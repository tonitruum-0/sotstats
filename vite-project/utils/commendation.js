export class Commendation {
  constructor(
    category,
    title,
    subtitle,
    grade,
    maxGrade,
    value,
    threshold,
    image
  ) {
    // These need to be initialized
    this.category = category;
    this.title = title;
    this.subtitle = subtitle;
    this.grade = grade;
    this.maxGrade = maxGrade;
    this.threshold = threshold;
    this.value = value;
    this.image = image;
    // These are added automatically
    this.percent;
    this.tags = [];

    this.percent =
      threshold == 0
        ? 0
        : +(Math.round((value / threshold) * 100 + 'e+2') + 'e-2');

    // Add tags
    if (this.maxGrade == 1) {
      this.tags.push('Single Grade');
    } else if (this.grade == this.maxGrade) {
      this.tags.push('Max Grade');
    }

    if (this.percent == 100) {
      this.tags.push('Complete');
    } else {
      this.tags.push('Incomplete');
    }
  }

  print() {
    console.log(
      `(${this.category}) ${this.title} \n${this.subtitle}\nGrade ${this.grade}/${this.maxGrade} (${this.percent}%)`
    );
  }
}
