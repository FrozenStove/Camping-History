CREATE TABLE  public.userData (
	"_id" serial NOT NULL,
	"site_name" varchar NOT NULL,
	"site_id" integer NOT NULL,
	"visit_date" DATE NOT NULL,
	"comment" varchar NOT NULL,
	"username" varchar NOT NULL,
	CONSTRAINT "userData_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
